import { collection, doc, getDocs, getFirestore } from "./firebase";
import React from "react";
import { MdEngineering, MdOutlineEmojiEmotions, MdWork } from "react-icons/md";
import { PiBarbellFill } from "react-icons/pi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { IoEar } from "react-icons/io5";
import { BiSolidBrain } from "react-icons/bi";
import { FaBookReader, FaTheaterMasks } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { TbAbc } from "react-icons/tb";
import { GiBookmarklet, GiPaintBrush } from "react-icons/gi";
import { getCurrentUserInfo } from "./userService";
import { testMetaData } from "./testData";

//List of all tests. Big metadata. Update this list after uploading new test data onto firebase.


const testLogoData = {
  engineering: {
    logo: (size) =>
      React.createElement(MdEngineering, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  brain: {
    logo: (size) =>
      React.createElement(BiSolidBrain, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  interest: {
    logo: (size) =>
      React.createElement(GiPaintBrush, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  iq: {
    logo: (size) =>
      React.createElement(RiLightbulbFlashFill, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  personality: {
    logo: (size) =>
      React.createElement(FaTheaterMasks, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  stream: {
    logo: (size) =>
      React.createElement(PiCertificateFill, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  strength: {
    logo: (size) =>
      React.createElement(PiBarbellFill, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  vark: {
    logo: (size) =>
      React.createElement(PiBarbellFill, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  english: {
    logo: (size) =>
      React.createElement(TbAbc, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  eq:{
    logo: (size) =>
      React.createElement(MdOutlineEmojiEmotions, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  study:{
    logo: (size) =>
      React.createElement(FaBookReader, {
        className: `text-gray-700`,
        size: size,
      }),
  },

  career:{
    logo: (size) =>
      React.createElement(MdWork, {
        className: `text-gray-700`,
        size: size,
      }),
  }
};

//Functions relating to tests are defined here. 

const db = getFirestore();

const getTestLogo = (testName, size) => {
  return testMetaData[testName].logo;
};

const getTestMetaData = (testName) => {
  return testMetaData[testName];
};

const getDefaultProfilePic = () => {
  return defaultUserPic;
};

// Function to get list of tests user has not yet taken.
const getRemainingTests = (excludedTests) => {
  const filteredTests = Object.keys(testMetaData)
    .filter(
      (testKey) =>
        !excludedTests.some(
          (excludedTest) =>
            excludedTest["test-name"].toLowerCase() ===
            testMetaData[testKey].queryCode.toLowerCase()
        )
    )
    .map((testKey) => testMetaData[testKey]);

  return filteredTests;
};

//Function to get test questions and optionsfrom firebase.
async function getTestQuestions(testName) {
  try {
    const testQuestionsCollection = collection(db, "test-content");
    const testQuestionsDocRef = doc(testQuestionsCollection, testName);
    const contentCollection = collection(testQuestionsDocRef, "questions");

    const querySnapshot = await getDocs(contentCollection);
    let questions = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        question: data.question,
        options: Object.entries(data.options).map(([key, value]) => ({
          id: key,
          text: value,
        })),
      };
    });

    console.log(questions)

    if (questions.length > 30) {
      questions = questions.sort(() => 0.5 - Math.random()).slice(0, 30);
    }

    return questions;
  } catch (error) {
    console.error("Error retrieving questions:", error);
    throw error;
  }
}

//Function to evaluate tests. Would be great if it can be shifted to server side someday.
async function evaluteTest(testName, selectedOptions) {

  function calculateGrade(correctAnswers) {
  const percentage = (correctAnswers / 30) * 100;
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  if (percentage >= 50) return 'E';
  return 'F';
  }

  //NOTE: Function contains several special cases for evaluation of certain tests. 

  const evaluationType = getTestMetaData(testName).evaluationType;
  try {
    const testQuestionsCollection = collection(db, "test-content");
    const testQuestionsDocRef = doc(testQuestionsCollection, testName);
    const answerKeyCollection = collection(testQuestionsDocRef, "answer-key");

    // Fetch the entire answer key
    const answerKeySnapshot = await getDocs(answerKeyCollection);


    if (evaluationType == "aggregation") {
      // Most of tests fall under this category. Options to each question contains several different attributes they are related to.
      // To find answer, just agregate all of these attributes and their scores.
      const answerKey = {};
      var results = {};
      answerKeySnapshot.forEach((doc) => {
        answerKey[doc.id] = doc.data();
      });
      for (let [questionId, optionId] of Object.entries(selectedOptions)) {
        const weights = answerKey[questionId];
        if (weights) {
          const optionWeight = weights[optionId];
          if (optionWeight) {
            Object.keys(optionWeight).forEach((weight) => {
              if (results[weight]) results[weight] += optionWeight[weight];
              else results[weight] = optionWeight[weight];
            });
          }
        } else {
          console.warn(`Answer key not found for question ${questionId}`);
        }
      }
      var resultsArray = Object.entries(results);
      resultsArray.sort((a, b) => b[1] - a[1]);
      results = Object.fromEntries(resultsArray);

      if(testName === "brain"){
        // If its a brain test, change the key names to be accurately displayed in the results section.
        const tempRes = {'Left Hemisphere':results.left, 'Right Hemisphere':results.right}
        return tempRes
      }

      return results;

    } else if (evaluationType == "single-option") {
      //Used for tests where there is only one correct option.
      let correctAnswers = 0;
      const answerKey = answerKeySnapshot.docs[0].data();
      for (let [questionId, optionId] of Object.entries(selectedOptions)) {
        if (optionId === answerKey[questionId]) correctAnswers += 1;
      }

      let res = {'Correct Answers':correctAnswers,'Wrong Answers':Object.values(selectedOptions).length - correctAnswers};
      
      if (testName === 'english') {
        //If its and english test, calculate a grade based on the correct option.
        const grade = calculateGrade(correctAnswers);
        res.grade = grade;
      }
      return res
    }

    if (evaluationType == "weighted-aggregation") {
      //Similar to aggregation, but here there is an external weight to all atributes that the user is selecting.
      const answerKey = {};
      var results = {};
      answerKeySnapshot.forEach((doc) => {
        answerKey[doc.id] = doc.data();
      });
      for (let [questionId, selectedWeight] of Object.entries(
        selectedOptions
      )) {
        const weights = answerKey[questionId];
        if (weights) {
          const optionWeight = weights;
          if (optionWeight) {
            Object.keys(optionWeight).forEach((weight) => {
              if (results[weight])
                results[weight] += selectedWeight * optionWeight[weight];
              else results[weight] = selectedWeight * optionWeight[weight];
            });
          }
        } else {
          console.warn(`Answer key not found for question ${questionId}`);
        }
      }
      var resultsArray = Object.entries(results);
      resultsArray.sort((a, b) => b[1] - a[1]);

      if (testName === 'engineering') {
        //For engineering test, return just the top 5 most scored options.
         resultsArray = resultsArray.slice(0, 5);
      }
      results = Object.fromEntries(resultsArray);
      return results;
    }

    if (evaluationType === 'ranged-score'){
      // Tests where the final result is based on the range within which the score lies.

      //Similar to aggregation, sum all the scores.
      const answerKey = {};
      var results = {};
      answerKeySnapshot.forEach((doc) => {
        answerKey[doc.id] = doc.data();
      });
      for (let [questionId, optionId] of Object.entries(selectedOptions)) {
        const weights = answerKey[questionId];
        if (weights) {
          const optionWeight = weights[optionId];
          if (optionWeight) {
            Object.keys(optionWeight).forEach((weight) => {
              if (results[weight]) results[weight] += optionWeight[weight];
              else results[weight] = optionWeight[weight];
            });
          }
        } else {
          console.warn(`Answer key not found for question ${questionId}`);
        }
      }

      const number = results['Score']

      const ranges = answerKey['ranges']
      
      //Finding the max and min of the ranges. Required for showing in the graph.
      let minRange = Number.MAX_SAFE_INTEGER;
      let maxRange = Number.MIN_SAFE_INTEGER;
      let rangedLevel;


      for (const [range, value] of Object.entries(ranges)) {
        const [min, max] = range.split('-').map(Number);
        minRange = Math.min(minRange, min);
        maxRange = Math.max(maxRange, max);

        // If number is within range, set the level to it
        if (number >= min && number <= max) {
          rangedLevel = value;
        }
      }


      return { level: rangedLevel, maxRange: maxRange, minRange: minRange, score: number };


    }
  } catch (error) {
    console.error("Error calculating total score:", error);
    throw error;
  }
}

//Function that initates the mail to be sent to users after a test is taken.
const sendTestResultsMail = async (testName,result) => {
  // Once results is calculated, send results along with user details to a cloudflare worker. 
  // The worker will then handle sending a mail.
  const testData = await getTestMetaData(testName);
  const userData = await getCurrentUserInfo();

  const requestBody = {
    name: userData.displayName,
    email: userData.email,
    "results":result,
    "testName":testData.name,
    "testType":testData.evaluationType == 'single-option'?'single-option':"aggregation"
  }

  try {
      const response = await fetch("https://result-mail-sender.branchselector.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
         mode: 'no-cors'
      });
      if (response.ok) {
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
    }

}

export {
  testMetaData,
  getTestMetaData,
  getTestLogo,
  getRemainingTests,
  getDefaultProfilePic,
  getTestQuestions,
  evaluteTest,
  sendTestResultsMail
};
