import { collection, doc, getDocs, getFirestore } from "./firebase";
import React from "react";
import { MdEngineering, MdOutlineEmojiEmotions } from "react-icons/md";
import { PiBarbellFill } from "react-icons/pi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { IoEar } from "react-icons/io5";
import { BiSolidBrain } from "react-icons/bi";
import { FaTheaterMasks } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { TbAbc } from "react-icons/tb";
import { GiBookmarklet, GiPaintBrush } from "react-icons/gi";
import { getCurrentUserInfo } from "./userService";

const testMetaData = {
  engineering: {
    queryCode: "engineering",
    name: "Engineering Test",
    displayType: "slider",
    evaluationType: "weighted-aggregation",
  },

  brain: {
    queryCode: "brain",
    name: "Brain Test",
    displayType: "mcq",
    evaluationType: "aggregation",
  },

  interest: {
    queryCode: "interest",
    name: "Interest Test",
    displayType: "mcq",
    evaluationType: "aggregation",
  },

  iq: {
    queryCode: "iq",
    name: "IQ Test",
    displayType: "img-mcq",
    evaluationType: "single-option",
  },

  personality: {
    queryCode: "personality",
    name: "Personality Test",
    displayType: "mcq",
    evaluationType: "aggregation",
  },

  stream: {
    queryCode: "stream",
    name: "Stream Test",
    displayType: "mcq",
    evaluationType: "aggregation",
  },

  strength: {
    queryCode: "strength",
    name: "Strength Test",
    displayType: "mcq",
    evaluationType: "aggregation",
  },

  vark: {
    queryCode: "vark",
    name: "VARK Test",
    displayType: "mcq",
    evaluationType: "aggregation",
  },

  english: {
    queryCode: "english",
    name: "English Test",
    displayType: "mcq",
    evaluationType: "single-option",
  },

  study:{
    queryCode:"study",
    name:"Study Habits Test",
    displayType:"mcq",
    evaluationType:"aggregation"
  },

  eq:{
    queryCode:"eq",
    name:"EQ Test",
    displayType:"mcq",
    evaluationType:"aggregation"
  }
};

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
      React.createElement(GiBookmarklet, {
        className: `text-gray-700`,
        size: size,
      }),
  }
};

const db = getFirestore();

const getTestLogo = (testName, size) => {
  return testLogoData[testName].logo(size);
};

const getTestMetaData = (testName) => {
  return testMetaData[testName];
};

const getDefaultProfilePic = () => {
  return defaultUserPic;
};

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

async function getTestQuestions(testName) {
  try {
    const testQuestionsCollection = collection(db, "test-content");
    const testQuestionsDocRef = doc(testQuestionsCollection, testName);
    const contentCollection = collection(testQuestionsDocRef, "questions");

    const querySnapshot = await getDocs(contentCollection);
    const questions = querySnapshot.docs.map((doc) => {
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

    return questions;
  } catch (error) {
    console.error("Error retrieving questions:", error);
    throw error;
  }
}

async function evaluteTest(testName, selectedOptions) {
  const evaluationType = getTestMetaData(testName).evaluationType;
  try {
    const testQuestionsCollection = collection(db, "test-content");
    const testQuestionsDocRef = doc(testQuestionsCollection, testName);
    const answerKeyCollection = collection(testQuestionsDocRef, "answer-key");

    // Fetch the entire answer key
    const answerKeySnapshot = await getDocs(answerKeyCollection);

    if (evaluationType == "aggregation") {
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
      console.log(resultsArray)
      results = Object.fromEntries(resultsArray);

      if(testName === "brain"){
        const tempRes = {'Left Hemisphere':results.left, 'Right Hemisphere':results.right}
        return tempRes
      }

      return results;

    } else if (evaluationType == "single-option") {
      let correctAnswers = 0;
      const answerKey = answerKeySnapshot.docs[0].data();
      for (let [questionId, optionId] of Object.entries(selectedOptions)) {
        if (optionId === answerKey[questionId]) correctAnswers += 1;
      }

      return {'Correct Answers':correctAnswers,'Wrong Answers':Object.values(selectedOptions).length - correctAnswers};
    }

    if (evaluationType == "weighted-aggregation") {
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
         resultsArray = resultsArray.slice(0, 5);
      }
      results = Object.fromEntries(resultsArray);
      return results;
    }
  } catch (error) {
    console.error("Error calculating total score:", error);
    throw error;
  }
}

const sendTestResultsMail = async (testName,result) => {
  const testData = await getTestMetaData(testName);
  const userData = await getCurrentUserInfo();

  const requestBody = {
    name: userData.displayName,
    email: userData.email,
    "results":result,
    "testName":testData.name,
    "testType":testData.evaluationType == 'single-option'?'single-option':"aggregation"
  }

  console.log("Mail server update body", JSON.stringify(requestBody))

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
        console.log("Mail server contacted succefuly");
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
