// import engineeringLogo from "../../Assets/engineer.png";
// import brainLogo from "../../Assets/brain.png";
// import interestLogo from "../../Assets/interest.png";
// import IQLogo from "../../Assets/iq.png";
// import personalityLogo from "../../Assets/memory.png";
// import streamLogo from "../../Assets/classXI.png";
// import strengthLogo from "../../Assets/strength.png";
// import varkLogo from "../../Assets/vark.png";

// import defaultUserPic from "../../Assets/defaultUser.png";
import { collection, doc, getDocs, getFirestore } from "./firebase";

const testInformation = {};
//   "Engineering Test": {
//     query_code: "engineering",
//     name: "Engineering Test",
//     logo: engineeringLogo,
//     testPage: "/engineering/test",
//     resultPage: "/engineering/results",
//   },
//   "Brain Test": {
//     query_code: "brain",
//     name: "Brain Test",
//     logo: brainLogo,
//     testPage: "/brain/test",
//     resultPage: "/brain/results",
//   },
//   "Interest Test": {
//     query_code: "interest",
//     name: "Interest Test",
//     logo: interestLogo,
//     testPage: "/interest/test",
//     resultPage: "/interest/results",
//   },
//   "IQ Test": {
//     query_code: "iq",
//     name: "IQ Test",
//     logo: IQLogo,
//     testPage: "/iq/test",
//     resultPage: "/iq/results",
//   },
//   "Personality Test": {
//     query_code: "personality",
//     name: "Personality Test",
//     logo: personalityLogo,
//     testPage: "/personality/test",
//     resultPage: "/personality/results",
//   },
//   "Stream Test": {
//     query_code: "stream",
//     name: "Stream Test",
//     logo: streamLogo,
//     testPage: "/classX/test",
//     resultPage: "/classX/results",
//   },
//   "Strength Test": {
//     query_code: "strength",
//     name: "Strength Test",
//     logo: strengthLogo,
//     testPage: "/strength/test",
//     resultPage: "/strength/results",
//   },
//   "VARK Test": {
//     query_code: "vark",
//     name: "VARK Test",
//     logo: varkLogo,
//     testPage: "/vark/test",
//     resultPage: "/vark/results",
//   },
// };

const db = getFirestore();

const getTestLogo = (testName) => {
  return testInformation[testName].logo;
};

const getTestInfo = (testName) => {
  return testInformation[testName];
};

const getDefaultProfilePic = () => {
  return defaultUserPic;
};

const getRemainingTests = (excludedTests) => {
  const filteredTests = Object.keys(testInformation)
    .filter(
      (testKey) =>
        !excludedTests.some(
          (excludedTest) =>
            excludedTest["test-name"].toLowerCase() ===
            testInformation[testKey].name.toLowerCase()
        )
    )
    .map((testKey) => testInformation[testKey]);

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
  try {
    const testQuestionsCollection = collection(db, "test-content");
    const testQuestionsDocRef = doc(testQuestionsCollection, testName);
    const answerKeyCollection = collection(testQuestionsDocRef, "answer-key");

    // Fetch the entire answer key
    const answerKeySnapshot = await getDocs(answerKeyCollection);

    const answerKey = {};

    const results = {};

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

    return results;
  } catch (error) {
    console.error("Error calculating total score:", error);
    throw error;
  }
}

export {
  getTestInfo,
  getTestLogo,
  getRemainingTests,
  getDefaultProfilePic,
  getTestQuestions,
  evaluteTest,
};
