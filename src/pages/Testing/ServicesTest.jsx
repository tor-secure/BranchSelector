import { auth, getCurrentUser, logout } from "../../services/authService";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  deleteDoc
} from "../../services/firebase";
import { evaluteTest, getTestQuestions } from "../../services/testService";
import { getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

import {redeemCoupon, validateCouponCode} from "../../services/userService"

const ServicesTest = () => {
  async function getD() {
    const du = {"VARQ1":"VARO2","VARQ10":"VARO2","VARQ11":"VARO3","VARQ12":"VARO2","VARQ13":"VARO2","VARQ14":"VARO1","VARQ15":"VARO4","VARQ16":"VARO4","VARQ17":"VARO1","VARQ18":"VARO2","VARQ19":"VARO2","VARQ2":"VARO3","VARQ20":"VARO3","VARQ21":"VARO1","VARQ22":"VARO1","VARQ23":"VARO4","VARQ24":"VARO3","VARQ25":"VARO2","VARQ3":"VARO3","VARQ4":"VARO2","VARQ5":"VARO1","VARQ6":"VARO4","VARQ7":"VARO2","VARQ8":"VARO3","VARQ9":"VARO2"}
    ;
    //console.log(await generateCoupon(c.code,c["price-after-discount"],c["valid-from"],c["valid-till"],c.limit,3))
    console.log(await putDataToFireStoreRegular());
  }

  const style = {
    marginTop: "20%",
  };

  return (
    <>
      <button
        onClick={async () => {
          console.log(getD())
        }}
        style={style}
      >
        sadasdfdsfsd
      </button>
      <button onClick={async () => logout()} style={style}>
        Logout
      </button>
    </>
  );
};

export { ServicesTest };



const updateUsers = async () => {
  try {
    const db = getFirestore()
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);

    usersSnapshot.forEach(async (userDoc) => {
      const userRef = doc(usersCollection, userDoc.id);
      const userData = await getDoc(userRef);

      const testsTaken = userData.data().testsTaken || 0;
      const credit = 5 - testsTaken;
      await updateDoc(userRef, { credit });
    });

    console.log('Users updated successfully.');
  } catch (error) {
    console.error('Error updating users:', error);
    throw new Error('Error updating users.');
  }
};

const migrateUsers = async () => {
  try {
    console.log("starting migration...")
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);

    for (const userDoc of usersSnapshot.docs) {
      const userRef = doc(usersCollection, userDoc.id);

      // Set user credits back to 5
      await updateDoc(userRef, { credit: 5 });

      // Reference to the 'tests-taken' subcollection
      const testsTakenCollection = collection(userRef, 'tests-taken');
      const testsTakenSnapshot = await getDocs(testsTakenCollection);

      // Delete each document in the 'tests-taken' subcollection
      for (const testDoc of testsTakenSnapshot.docs) {
        const testDocRef = doc(testsTakenCollection, testDoc.id);
        await deleteDoc(testDocRef);
      }
    }

    console.log('Users migrated successfully.');
  } catch (error) {
    console.error('Error migrating users:', error);
    throw new Error('Error migrating users.');
  }
};

async function putDataToFireStoreRegular() {
  const db = getFirestore();

  const testName = "study";
  const testCode = "STU"; // Replace with your test name
  const questionData = [
  {
    question: "How often do you create a study schedule?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "When do you usually start preparing for exams?",
    options: ["Several weeks in advance", "One week in advance", "A few days before", "The night before"]
  },
  {
    question: "How do you handle distractions while studying?",
    options: ["I eliminate all distractions", "I minimize distractions", "I struggle but manage", "I often get distracted"]
  },
  {
    question: "How often do you review your notes?",
    options: ["Daily", "Weekly", "Before exams", "Rarely"]
  },
  {
    question: "How do you organize your study materials?",
    options: ["Everything is neatly organized", "Mostly organized", "Somewhat organized", "Not organized"]
  },
  {
    question: "Do you have a designated study space?",
    options: ["Yes, always", "Most of the time", "Occasionally", "No, I study anywhere"]
  },
  {
    question: "How often do you take breaks during study sessions?",
    options: ["Regularly", "Sometimes", "Rarely", "Never"]
  },
  {
    question: "How do you set your study goals?",
    options: ["Specific and realistic", "Somewhat specific", "Vague goals", "I don't set goals"]
  },
  {
    question: "What do you do when you don't understand something?",
    options: ["Seek help immediately", "Try to figure it out first", "Leave it and move on", "Ignore it"]
  },
  {
    question: "How often do you participate in study groups?",
    options: ["Frequently", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How well do you manage your time between school and other activities?",
    options: ["Very well", "Well", "Fairly well", "Poorly"]
  },
  {
    question: "How often do you rewrite or summarize your notes?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "Do you use a variety of study methods (e.g., flashcards, summarizing, teaching)?",
    options: ["Yes, frequently", "Yes, sometimes", "Rarely", "Never"]
  },
  {
    question: "How do you handle difficult or boring subjects?",
    options: ["I break them into smaller tasks", "I try to make them interesting", "I force myself through them", "I avoid them"]
  },
  {
    question: "How often do you set specific times for study sessions?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How well do you prioritize your tasks?",
    options: ["Very well", "Well", "Fairly well", "Poorly"]
  },
  {
    question: "How often do you study in a quiet environment?",
    options: ["Always", "Often", "Sometimes", "Rarely"]
  },
  {
    question: "How do you approach large assignments?",
    options: ["Break them into smaller tasks", "Plan and start early", "Work on them last minute", "Procrastinate"]
  },
  {
    question: "How often do you review past papers or practice tests?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "Do you set rewards for achieving study goals?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How often do you feel overwhelmed by your studies?",
    options: ["Rarely", "Occasionally", "Often", "Always"]
  },
  {
    question: "How do you handle setbacks in your studies?",
    options: ["Learn from them and move on", "Try to understand and fix them", "Get discouraged but continue", "Give up"]
  },
  {
    question: "How often do you engage in physical activity to manage stress?",
    options: ["Regularly", "Sometimes", "Rarely", "Never"]
  },
  {
    question: "How often do you seek feedback on your work?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How do you handle multiple assignments with the same deadline?",
    options: ["Plan and prioritize", "Work on them simultaneously", "Focus on one, then the next", "Last-minute rush"]
  },
  {
    question: "How often do you reflect on your study habits and adjust them?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you use technology to aid your studies?",
    options: ["Regularly", "Sometimes", "Rarely", "Never"]
  },
  {
    question: "How often do you compare your study habits with peers to find new methods?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How confident are you in your study abilities?",
    options: ["Very confident", "Confident", "Somewhat confident", "Not confident"]
  },
  {
    question: "How often do you seek help from teachers or tutors when needed?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How often do you ensure your study space is free from distractions (e.g., noise, clutter)?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How comfortable is your study environment (e.g., seating, lighting)?",
    options: ["Very comfortable", "Comfortable", "Somewhat comfortable", "Not comfortable"]
  },
  {
    question: "How often do you visualize your academic and career goals to stay motivated?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How often do you track your progress toward your study goals?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How often do you practice relaxation techniques (e.g., deep breathing, meditation) to manage stress?",
    options: ["Regularly", "Sometimes", "Rarely", "Never"]
  },
  {
    question: "How well do you balance academic work with leisure activities to prevent burnout?",
    options: ["Very well", "Well", "Fairly well", "Poorly"]
  },
  {
    question: "How often do you get enough sleep to stay focused and productive?",
    options: ["Always", "Often", "Sometimes", "Rarely"]
  },
  {
    question: "How do you react to receiving a poor grade?",
    options: ["Analyze what went wrong and improve", "Feel bad but try harder next time", "Feel discouraged", "Lose motivation"]
  },
  {
    question: "How do you handle unexpected changes to your study schedule or plans?",
    options: ["Adapt and stay on track", "Adjust with some difficulty", "Struggle but manage", "Get overwhelmed"]
  },
  {
    question: "How do you cope with academic challenges and difficulties?",
    options: ["Look for solutions and persist", "Try to manage with help", "Feel stressed but keep going", "Avoid or give up"]
  },
   {
    question: "How often do you seek feedback and use it constructively?",
    options: ["Always", "Often", "Sometimes", "Never"]
  },
  {
    question: "How often do you reflect on your academic performance and set new goals?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How open are you to trying new study methods and techniques?",
    options: ["Very open", "Open", "Somewhat open", "Not open"]
  },
  {
    question: "How often do you seek out resources (books, videos, workshops) to improve your study skills?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you self-assess your progress in achieving your study goals?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you use educational apps or software to aid your studies?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you use online resources (e.g., tutorials, forums) to supplement your learning?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you use digital tools (e.g., calendars, to-do lists) to organize your study schedule?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How comfortable are you with using technology for your studies?",
    options: ["Very comfortable", "Comfortable", "Somewhat comfortable", "Not comfortable"]
  },
  {
    question: "How often do you attend study groups or peer study sessions?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you discuss academic challenges with teachers or mentors?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you seek academic support from family or friends?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  },
  {
    question: "How often do you use tutoring services or academic support centers?",
    options: ["Regularly", "Occasionally", "Rarely", "Never"]
  }
];

  const answerKey = [
 [{"Time Management": 3}, {"Time Management": 2}, {"Time Management": 1}, {"Time Management": 0}],
  [{"Time Management": 3}, {"Time Management": 2}, {"Time Management": 1}, {"Time Management": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Learning Environment": 3}, {"Learning Environment": 2}, {"Learning Environment": 1}, {"Learning Environment": 0}],
  [{"Learning Environment": 3}, {"Learning Environment": 2}, {"Learning Environment": 1}, {"Learning Environment": 0}],
  [{"Time Management": 3}, {"Time Management": 2}, {"Time Management": 1}, {"Time Management": 0}],
  [{"Motivation": 3}, {"Motivation": 2}, {"Motivation": 1}, {"Motivation": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Time Management": 3}, {"Time Management": 2}, {"Time Management": 1}, {"Time Management": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Time Management": 3}, {"Time Management": 2}, {"Time Management": 1}, {"Time Management": 0}],
  [{"Time Management": 3}, {"Time Management": 2}, {"Time Management": 1}, {"Time Management": 0}],
  [{"Learning Environment": 3}, {"Learning Environment": 2}, {"Learning Environment": 1}, {"Learning Environment": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Motivation": 3}, {"Motivation": 2}, {"Motivation": 1}, {"Motivation": 0}],
   [{"Stress Management": 3}, {"Stress Management": 2}, {"Stress Management": 1}, {"Stress Management": 0}],
  [{"Resilience": 3}, {"Resilience": 2}, {"Resilience": 1}, {"Resilience": 0}],
  [{"Stress Management": 3}, {"Stress Management": 2}, {"Stress Management": 1}, {"Stress Management": 0}],
  [{"Study Techniques": 3}, {"Study Techniques": 2}, {"Study Techniques": 1}, {"Study Techniques": 0}],
  [{"Time Management": 3}, {"Time Management": 2}, {"Time Management": 1}, {"Time Management": 0}],
  [{"Self-Improvement": 3}, {"Self-Improvement": 2}, {"Self-Improvement": 1}, {"Self-Improvement": 0}],
  [{"Learning Tools": 3}, {"Learning Tools": 2}, {"Learning Tools": 1}, {"Learning Tools": 0}],
  [{"Learning Techniques": 3}, {"Learning Techniques": 2}, {"Learning Techniques": 1}, {"Learning Techniques": 0}],
  [{"Self-Efficacy": 3}, {"Self-Efficacy": 2}, {"Self-Efficacy": 1}, {"Self-Efficacy": 0}],
  [{"Support Seeking": 3}, {"Support Seeking": 2}, {"Support Seeking": 1}, {"Support Seeking": 0}],
  [{"Learning Environment": 3}, {"Learning Environment": 2}, {"Learning Environment": 1}, {"Learning Environment": 0}],
  [{"Learning Environment": 3}, {"Learning Environment": 2}, {"Learning Environment": 1}, {"Learning Environment": 0}],
  [{"Motivation": 3}, {"Motivation": 2}, {"Motivation": 1}, {"Motivation": 0}],
  [{"Motivation": 3}, {"Motivation": 2}, {"Motivation": 1}, {"Motivation": 0}],
  [{"Stress Management": 3}, {"Stress Management": 2}, {"Stress Management": 1}, {"Stress Management": 0}],
  [{"Stress Management": 3}, {"Stress Management": 2}, {"Stress Management": 1}, {"Stress Management": 0}],
  [{"Stress Management": 3}, {"Stress Management": 2}, {"Stress Management": 1}, {"Stress Management": 0}],
  [{"Resilience": 3}, {"Resilience": 2}, {"Resilience": 1}, {"Resilience": 0}],
  [{"Resilience": 3}, {"Resilience": 2}, {"Resilience": 1}, {"Resilience": 0}],
  [{"Resilience": 3}, {"Resilience": 2}, {"Resilience": 1}, {"Resilience": 0}],
  [{"Resilience": 3}, {"Resilience": 2}, {"Resilience": 1}, {"Resilience": 0}],
  [{"Self-Improvement": 3}, {"Self-Improvement": 2}, {"Self-Improvement": 1}, {"Self-Improvement": 0}],
  [{"Self-Improvement": 3}, {"Self-Improvement": 2}, {"Self-Improvement": 1}, {"Self-Improvement": 0}],
  [{"Self-Improvement": 3}, {"Self-Improvement": 2}, {"Self-Improvement": 1}, {"Self-Improvement": 0}],
  [{"Self-Improvement": 3}, {"Self-Improvement": 2}, {"Self-Improvement": 1}, {"Self-Improvement": 0}],
  [{"Learning Tools": 3}, {"Learning Tools": 2}, {"Learning Tools": 1}, {"Learning Tools": 0}],
  [{"Learning Tools": 3}, {"Learning Tools": 2}, {"Learning Tools": 1}, {"Learning Tools": 0}],
  [{"Learning Tools": 3}, {"Learning Tools": 2}, {"Learning Tools": 1}, {"Learning Tools": 0}],
  [{"Learning Tools": 3}, {"Learning Tools": 2}, {"Learning Tools": 1}, {"Learning Tools": 0}],
  [{"Support Seeking": 3}, {"Support Seeking": 2}, {"Support Seeking": 1}, {"Support Seeking": 0}],
  [{"Support Seeking": 3}, {"Support Seeking": 2}, {"Support Seeking": 1}, {"Support Seeking": 0}],
  [{"Support Seeking": 3}, {"Support Seeking": 2}, {"Support Seeking": 1}, {"Support Seeking": 0}],
  [{"Support Seeking": 3}, {"Support Seeking": 2}, {"Support Seeking": 1}, {"Support Seeking": 0}]
];

  // Store questions and options
const testQuestionsCollection = collection(db, "test-content");
  const testQuestionsDocRef = doc(testQuestionsCollection, testName);
  const contentCollection = collection(testQuestionsDocRef, "questions");

  // Uploading questions
  for (let index = 0; index < questionData.length; index++) {
    const question = questionData[index];
    const questionId = `${testCode}Q${index + 1}`;
    const questionDocRef = doc(contentCollection, questionId);

    const options = {};
    question.options.forEach((option, optionIndex) => {
      options[`${testCode}O${optionIndex + 1}`] = option;
    });

    try {
      await setDoc(questionDocRef, { question: question.question, options });
      console.log(`Question ${questionId} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading question ${questionId}:`, error);
    }
  }

  // Uploading answer keys
  const answerKeyCollection = collection(testQuestionsDocRef, "answer-key");

  for (let index = 0; index < answerKey.length; index++) {
    const answers = answerKey[index];
    const questionId = `${testCode}Q${index + 1}`;
    const answerKeyDocRef = doc(answerKeyCollection, questionId);

    const answerMap = {};
    for (let optionIndex = 0; optionIndex < answers.length; optionIndex++) {
      const answer = answers[optionIndex];
      const optionId = `${testCode}O${optionIndex + 1}`;
      answerMap[optionId] = answer;
    }

    try {
      await setDoc(answerKeyDocRef, answerMap);
      console.log(`Answer key for ${questionId} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading answer key for ${questionId}:`, error);
    }
  }
}

putDataToFireStore();



async function putDataToFireStore() {
  const db = getFirestore();

  const testName = "eq";
  const testCode = "EQ"; // Replace with your test name
  const questionData = []

  // Store questions and options
  const testQuestionsCollection = collection(db, "test-content");
  const testQuestionsDocRef = doc(testQuestionsCollection, testName);
  const contentCollection = collection(testQuestionsDocRef, "questions");
  const answerKeyCollection = collection(testQuestionsDocRef, "answer-key");

  const answerKey = []
  const answers = {};

  questionData.forEach((question, index) => {
    const questionId = `${testCode}Q${index + 1}`;
    const questionDocRef = doc(contentCollection, questionId);
    //const answerKeyDocRef = doc(answerKeyCollection, questionId);

    var answer = `${testCode}O` + answerKey[index].toString();
    answers[questionId] = answer;

    const weights = {};
    const options = {};

    question.options.forEach((option, optionIndex) => {
      options[`${testCode}O${optionIndex + 1}`] = option;
      /* weights[`${testCode}O${optionIndex + 1}`] = option.score;*/
    });

    console.log(question);
    console.log(answer);
    console.log(options);

    setDoc(questionDocRef, { question: question.question, options })
      .then(() => {
        console.log(`Question ${questionId} uploaded successfully`);
      })
      .catch((error) => {
        console.error(`Error uploading question ${questionId}:`, error);
      });

    /*
      setDoc(answerKeyDocRef, weights)
        .then(() => {
          console.log(`Answer key for ${questionId} uploaded successfully`);
        })
        .catch((error) => {
          console.error(`Error uploading answer key for ${questionId}:`, error);
        });*/
  });
  const answerKeyDocRef = doc(testQuestionsDocRef, "answer-key", "answers");
  setDoc(answerKeyDocRef, answers)
    .then(() => {
      console.log(`Answer key uploaded successfully`);
    })
    .catch((error) => {
      console.error(`Error uploading answer key for ${questionId}:`, error);
    });
}

async function putDataToFireStoreNew() {
  const db = getFirestore();

  const testName = "eq";
  const testCode = "EQ"; // Replace with your test code

  const questions = []
  const weights = 

  console.log(weights.length);

  // Store questions and options along with weights
  const testQuestionsCollection = collection(db, "test-content");
  const testQuestionsDocRef = doc(testQuestionsCollection, testName);
  const contentCollection = collection(testQuestionsDocRef, "questions");
  const answerKeyCollection = collection(testQuestionsDocRef, "answer-key");

  questions.forEach((question, index) => {
    const questionId = `${testCode}Q${index + 1}`;
    const questionDocRef = doc(contentCollection, questionId);
    const answerKeyDocRef = doc(answerKeyCollection, questionId);

    setDoc(questionDocRef, { question, options: {} })
      .then(() => {
        console.log(`Question ${questionId} uploaded successfully`);
      })
      .catch((error) => {
        console.error(`Error uploading question ${questionId}:`, error);
      });

    const weight = weights[index];
    setDoc(answerKeyDocRef, weight)
      .then(() => {
        console.log(`Answer key for ${questionId} uploaded successfully`);
      })
      .catch((error) => {
        console.error(`Error uploading answer key for ${questionId}:`, error);
      });
  });
}

async function putDataToFirestore_img() {
  const db = getFirestore();

  const testName = "iq";
  const testCode = "IQT"; // Replace with your test code

  const questionSet = [
    {
      question: 'What is the correct definition of the word "ardent"?',
      options: ["Angry", "Enthusiastic", "Lazy", "Sad"],
    },
    {
      question: "Which of the following sentences is grammatically correct?",
      options: [
        "Him and me went to the store.",
        "He and I went to the store.",
        "Me and he went to the store.",
        "Me and him went to the store.",
      ],
    },
    {
      question: "Choose the correct spelling:",
      options: ["Accommadate", "Accommodate", "Acommodate", "Acommodatte"],
    },
    {
      question: 'What is the antonym of "joyful"?',
      options: ["Sad", "Angry", "Excited", "Happy"],
    },
    {
      question: "Identify the correct use of the apostrophe:",
      options: [
        "Its been a long day.",
        "It's been a long day.",
        "Its' been a long day.",
        "Its been a long day.",
      ],
    },
    {
      question: "Which sentence is in the passive voice?",
      options: [
        "She ate the cake quickly.",
        "The cake was eaten quickly by her.",
        "Quickly, the cake was eaten by her.",
        "The cake eaten quickly by her.",
      ],
    },
    {
      question:
        'What is the correct form of the verb in this sentence: "She ___ to the party yesterday"?',
      options: ["Goes", "Gone", "Went", "Go"],
    },
    {
      question:
        'Choose the correct word to complete the sentence: "I ___ to the store yesterday."',
      options: ["Went", "Gone", "Go", "Goes"],
    },
    {
      question: "Which sentence is grammatically correct?",
      options: [
        "I have went to the store yesterday.",
        "I have gone to the store yesterday.",
        "I have go to the store yesterday.",
        "I have going to the store yesterday.",
      ],
    },
    {
      question: 'What is the correct past tense of the verb "sing"?',
      options: ["Singed", "Sanged", "Sang", "Sung"],
    },
    {
      question: 'What is the correct definition of the word "benevolent"?',
      options: ["Selfish", "Kind-hearted", "Cruel", "Dishonest"],
    },
    {
      question: "Choose the correct sentence:",
      options: [
        "The cat laid on the bed.",
        "The cat lain on the bed.",
        "The cat laid on the bed.",
        "The cat layed on the bed.",
      ],
    },
    {
      question: "Identify the correctly punctuated sentence:",
      options: [
        "I can't believe it's Monday already.",
        "I cant believe its Monday already.",
        "I can't believe its Monday already.",
        "I can't believe its monday already.",
      ],
    },
    {
      question: "Choose the correct homophone:",
      options: ["Their", "There", "They're", "Thier"],
    },
    {
      question: 'What is the plural form of "child"?',
      options: ["Childs", "Childes", "Childrens", "Children"],
    },
    {
      question: "Identify the correct possessive form:",
      options: [
        "The dog's tail wagged happily.",
        "The dogs' tail wagged happily.",
        "The dogs tail wagged happily.",
        "The dog' tail wagged happily.",
      ],
    },
    {
      question: "Which sentence is grammatically correct?",
      options: [
        "He don't have any siblings.",
        "He doesn't have any siblings.",
        "He haven't any siblings.",
        "He isn't have any siblings.",
      ],
    },
    {
      question: 'What is the correct comparative form of "good"?',
      options: ["Better", "Gooder", "Best", "More good"],
    },
    {
      question:
        'Choose the correct word to complete the sentence: "The __ car in the lot was blue."',
      options: [
        "Most expensive",
        "Expensiver",
        "Most expensivest",
        "More expensive",
      ],
    },
    {
      question: "What is the correct spelling?",
      options: ["Necessery", "Necesary", "Necessary", "Necessary"],
    },
    {
      question:
        "A way of doing something especially an ordered set of procedures or an orderly system",
      options: ["method", "process", "presentation", "agendas"],
    },
    {
      question:
        "The use of a bottle for the drinking of alcohol or the crown for the sovereign is the example of",
      options: ["metonymy", "antonym", "personification", "alliteration"],
    },
    {
      question: "To cancel (a law, agreement, etc.) formally or officially",
      options: ["object", "abjure", "terminate", "abrogate"],
    },
    {
      question: "The act of giving up something one has or would like to have",
      options: ["sacrilege", "Abnegation", "sacrifice", "acquiesce"],
    },
    {
      question: "Select the word that is opposite in meaning to the word Asset",
      options: ["credibility", "liability", "poverty", "prosperity"],
    },
    {
      question:
        "Select the word that is opposite in meaning to the word Smother",
      options: ["repress", "cheer", "nurture", "irritate"],
    },
    {
      question:
        "Select the word that is opposite in meaning to the word Reprimand",
      options: ["reward", "appreciate", "encourage", "praise"],
    },
    {
      question:
        "Select the word that is opposite in meaning to the word Tangible",
      options: ["gentle", "elusive", "refined", "palpabl"],
    },
  ];

  const answerKey = [
    2, 2, 2, 1, 2, 2, 3, 1, 2, 3, 2, 1, 1, 1, 4, 1, 2, 1, 1, 3, 1, 1, 4, 2, 2,
    1, 3, 1, 2,
  ];

  console.log(answerKey.length, questionSet.length);

  const contentCollection = collection(db, "test-content");
  const testQuestionsDocRef = doc(contentCollection, testName);
  const answers = {};
  questionSet.forEach((question, index) => {
    const questionId = `${testCode}Q${index + 1}`;
    const questionDocRef = doc(testQuestionsDocRef, "questions", questionId);

    const options = {};

    Object.keys(question).forEach((key) => {
      if (key !== "question") {
        const optionId = "IQTO" + (key.charCodeAt(0) - 65 + 1).toString(); // Convert A/B/C to 1/2/3
        options[optionId] = question[key];
      }
    });

    const questionData = {
      question: question["question"],
      options: options,
    };
    /*
    setDoc(questionDocRef, questionData)
      .then(() => {
        console.log(`Question ${questionId} uploaded successfully`);
      })
      .catch((error) => {
        console.error(`Error uploading question ${questionId}:`, error);
      });
*/
    var answer = "IQTO" + answerKey[index].toString();
    answers[questionId] = answer;
    /*
    const answerKeyDocRef = doc(testQuestionsDocRef, 'answer-key', questionId);
    setDoc(answerKeyDocRef, { [questionId]: answer })
      .then(() => {
        console.log(`Answer key for ${questionId} uploaded successfully`);
      })
      .catch((error) => {
        console.error(`Error uploading answer key for ${questionId}:`, error);
      });*/
  });
  const answerKeyDocRef = doc(testQuestionsDocRef, "answer-key", "answers");
  setDoc(answerKeyDocRef, answers)
    .then(() => {
      console.log(`Answer key uploaded successfully`);
    })
    .catch((error) => {
      console.error(`Error uploading answer key for ${questionId}:`, error);
    });
}
