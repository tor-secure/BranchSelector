/* Testing ground for new functions etc. Have to delete someday when everything is complete */

import { auth, getCurrentUser, logger, logout } from "../../services/authService";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  deleteDoc,
  addDoc
} from "../../services/firebase";
import { evaluteTest, getTestQuestions } from "../../services/testService";
import { getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

import {redeemCoupon, validateCouponCode} from "../../services/userService"

const db = getFirestore()
const firestore = getFirestore()

const ServicesTest = () => {
  async function getD() {
    const du = {"VARQ1":"VARO2","VARQ10":"VARO2","VARQ11":"VARO3","VARQ12":"VARO2","VARQ13":"VARO2","VARQ14":"VARO1","VARQ15":"VARO4","VARQ16":"VARO4","VARQ17":"VARO1","VARQ18":"VARO2","VARQ19":"VARO2","VARQ2":"VARO3","VARQ20":"VARO3","VARQ21":"VARO1","VARQ22":"VARO1","VARQ23":"VARO4","VARQ24":"VARO3","VARQ25":"VARO2","VARQ3":"VARO3","VARQ4":"VARO2","VARQ5":"VARO1","VARQ6":"VARO4","VARQ7":"VARO2","VARQ8":"VARO3","VARQ9":"VARO2"}
    ;
    //console.log(await generateCoupon(c.code,c["price-after-discount"],c["valid-from"],c["valid-till"],c.limit,3))
   // console.log(await putDataToFireStoreRegular());
  }

  const style = {
    marginTop: "20%",
  };

  return (
    <>
      <button
        onClick={async () => {
          await putDataToFireStoreRegular();
        }}
        style={style}
      >
        sadasdfdsfsd
      </button>
      <button onClick={async () => {;}} style={style}>
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

  const testName = "medical";
  const testCode = "MED"; // Replace with your test name
  const questionData = [
  {
    question: "Do you enjoy learning about different cultures and customs, particularly in relation to healthcare?",
    options: [
      "I’m interested but not deeply.",
      "I’m very interested in cultural aspects of healthcare.",
      "I find it somewhat interesting.",
      "I’m not really interested."
    ]
  },
  {
    question: "How well do you manage time and prioritize tasks?",
    options: [
      "I’m excellent at time management and prioritization.",
      "I find it hard to prioritize tasks.",
      "I struggle to manage time effectively.",
      "I’m good but sometimes get overwhelmed."
    ]
  },
  {
    question: "Are you disciplined and capable of maintaining focus during long periods of study or work?",
    options: [
      "I’m highly disciplined and focused.",
      "I’m disciplined but can get distracted.",
      "I find it hard to maintain focus for long periods.",
      "I struggle with discipline and focus."
    ]
  },
  {
    question: "How comfortable are you with taking responsibility for others' well-being?",
    options: [
      "Uncomfortable, it’s too much pressure.",
      "Very comfortable, I’m confident in such roles.",
      "Comfortable, but I recognize the weight of the responsibility.",
      "I’m cautious and sometimes unsure."
    ]
  },
  {
    question: "Do you have a strong ability to memorize and recall information?",
    options: [
      "My memory is good, but I need to review regularly.",
      "Yes, I have an excellent memory.",
      "I find it hard to memorize large amounts of information.",
      "I struggle with memory retention."
    ]
  },
  {
    question: "Are you empathetic and able to understand others’ feelings?",
    options: [
      "Yes, I’m very empathetic and caring.",
      "I’m empathetic but sometimes struggle to relate.",
      "I find it hard to empathize with others.",
      "I’m not very empathetic."
    ]
  },
  {
    question: "How do you handle seeing blood or injuries?",
    options: [
      "I’m comfortable and calm.",
      "I get very uncomfortable.",
      "I avoid such situations.",
      "I’m a bit squeamish but manage."
    ]
  },
  {
    question: "Are you committed to following a strict code of conduct in your professional life?",
    options: [
      "Yes, I’m very committed.",
      "I prefer more flexibility.",
      "I try to follow but struggle with strict rules.",
      "I’m committed but find it challenging at times."
    ]
  },
  {
    question: "Are you able to make quick decisions in critical situations?",
    options: [
      "I usually need more time to decide.",
      "Yes, I’m decisive and confident under pressure.",
      "I find it difficult to make quick decisions.",
      "I can, but I need a moment to think."
    ]
  },
  {
    question: "How do you feel about working long hours, possibly overnight?",
    options: [
      "I’m fine with it occasionally.",
      "I’m okay with it; I’m committed to the job.",
      "I prefer a regular 9-5 schedule.",
      "I’m not comfortable with long or irregular hours."
    ]
  },
  {
    question: "Do you enjoy problem-solving and diagnosing issues?",
    options: [
      "Yes, I love solving complex problems.",
      "I prefer straightforward tasks.",
      "I enjoy it, but it can be challenging.",
      "Not really."
    ]
  },
  {
    question: "Are you physically fit and able to handle physically demanding tasks?",
    options: [
      "I’m reasonably fit but could improve.",
      "Yes, I’m in great physical shape.",
      "I find physically demanding tasks challenging.",
      "I’m not physically fit."
    ]
  },
  {
    question: "How important is helping others to you?",
    options: [
      "Not very important.",
      "Important, I like to help when I can.",
      "Extremely important, it’s my top priority.",
      "Moderately important, I help if needed."
    ]
  },
  {
    question: "How well do you follow procedures and protocols?",
    options: [
      "I try but find it hard to stick to strict procedures.",
      "I follow them but may sometimes overlook details.",
      "I strictly follow all procedures and protocols.",
      "I prefer to improvise rather than follow protocols."
    ]
  },
  {
    question: "How do you feel about continuing education and lifelong learning?",
    options: [
      "I prefer to learn only when necessary.",
      "I’m open to it but not overly excited.",
      "I’m very enthusiastic about it.",
      "I’m not interested in continuous learning."
    ]
  },
  {
    question: "How well do you handle feedback and criticism?",
    options: [
      "I find it hard to take criticism.",
      "I accept it but sometimes feel defensive.",
      "I struggle with feedback and tend to avoid it.",
      "I take it well and use it to improve."
    ]
  },
  {
    question: "Are you comfortable working in high-pressure situations?",
    options: [
      "Yes, I thrive in high-pressure environments.",
      "I find it difficult but try my best.",
      "I manage well but need time to adjust.",
      "No, I prefer calmer environments."
    ]
  },
  {
    question: "Are you good at managing stress?",
    options: [
      "Yes, I handle stress very well.",
      "I find stress overwhelming.",
      "I struggle with stress but try to cope.",
      "I manage stress adequately."
    ]
  },
  {
    question: "How patient are you when dealing with difficult or uncooperative people?",
    options: [
      "I’m patient but can get frustrated over time.",
      "Very patient, I handle such situations calmly.",
      "I struggle with difficult people.",
      "I find it very challenging to stay patient."
    ]
  },
  {
    question: "Do you have a strong interest in biology and human anatomy?",
    options: [
      "I find it interesting but challenging.",
      "I prefer other sciences like physics or chemistry.",
      "Not really.",
      "Yes, I love learning about the human body."
    ]
  },
  {
    question: "How do you feel about working with advanced technology and medical equipment?",
    options: [
      "I’m not comfortable with advanced technology.",
      "I find it challenging but manageable.",
      "I’m very interested and comfortable with technology.",
      "I’m comfortable but not overly enthusiastic."
    ]
  },
  {
    question: "Do you have good hand-eye coordination and manual dexterity?",
    options: [
      "Yes, I’m very coordinated and skilled with my hands.",
      "I’m not very coordinated.",
      "I sometimes struggle with coordination.",
      "I’m fairly coordinated."
    ]
  },
  {
    question: "How comfortable are you with handling sensitive or confidential information?",
    options: [
      "Yes, I understand the importance of confidentiality.",
      "I’m uncomfortable with such responsibilities.",
      "I’m comfortable but sometimes find it stressful.",
      "I prefer not to handle sensitive information."
    ]
  },
  {
    question: "Do you have the resilience to handle setbacks and challenges in your work?",
    options: [
      "I find setbacks hard to deal with.",
      "I’m resilient but sometimes take time to recover.",
      "I struggle significantly with setbacks.",
      "Yes, I’m very resilient and bounce back quickly."
    ]
  },
  {
    question: "Are you prepared to handle emotional challenges, such as dealing with loss or grief?",
    options: [
      "I find it very overwhelming.",
      "I can handle it but find it difficult.",
      "I find it very challenging.",
      "Yes, I’m emotionally resilient."
    ]
  },
  {
    question: "How well do you work in a team setting?",
    options: [
      "I work well with others.",
      "I work excellently in teams and often take the lead.",
      "I prefer working alone but can manage in teams.",
      "I find teamwork challenging."
    ]
  },
  {
    question: "Do you have a strong ethical foundation and a sense of integrity?",
    options: [
      "Yes, I always act with integrity and ethics.",
      "I find ethical dilemmas very challenging.",
      "I have strong ethics but sometimes struggle with difficult decisions.",
      "I try to be ethical but find it hard in complex situations."
    ]
  },
  {
    question: "How interested are you in research and staying updated with medical advancements?",
    options: [
      "Not really interested in research.",
      "I’m interested but don’t always keep up.",
      "I’m somewhat interested, but it’s not a priority.",
      "Yes, I’m passionate about medical research."
    ]
  },
  {
    question: "How would you rate your communication skills, especially in explaining complex concepts?",
    options: [
      "Average, I sometimes struggle to explain complex ideas.",
      "Poor, I find it hard to communicate complex information.",
      "Excellent, I’m very clear and patient.",
      "Good, I manage to explain things well."
    ]
  },
  {
    question: "Are you detail-oriented and meticulous in your work?",
    options: [
      "I sometimes overlook details.",
      "Yes, I pay great attention to detail.",
      "I’m more of a big-picture thinker.",
      "I’m usually detail-oriented."
    ]
  }
];


const answerKey = [
  [
    { "Score": 3 },
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  [
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 3 }
  ],
  [
    { "Score": 4 },
    { "Score": 3 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 1 },
    { "Score": 4 },
    { "Score": 3 },
    { "Score": 2 }
  ],
  [
    { "Score": 3 },
    { "Score": 4 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 4 },
    { "Score": 3 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 3 }
  ],
  [
    { "Score": 4 },
    { "Score": 2 },
    { "Score": 1 },
    { "Score": 3 }
  ],
  [
    { "Score": 1 },
    { "Score": 4 },
    { "Score": 2 },
    { "Score": 3 }
  ],
  [
    { "Score": 3 },
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  [
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 3 },
    { "Score": 2 }
  ],
  [
    { "Score": 3 },
    { "Score": 4 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 1 },
    { "Score": 3 },
    { "Score": 4 },
    { "Score": 2 }
  ],
  [
    { "Score": 2 },
    { "Score": 1 },
    { "Score": 4 },
    { "Score": 3 }
  ],
  [
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 3 },
    { "Score": 4 }
  ],
  [
    { "Score": 4 },
    { "Score": 2 },
    { "Score": 3 },
    { "Score": 1 }
  ],
  [
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 3 }
  ],
  [
    { "Score": 3 },
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  [
    { "Score": 2 },
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 3 }
  ],
  [
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 3 },
    { "Score": 4 }
  ],
  [
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 4 },
    { "Score": 2 }
  ],
  [
    { "Score": 2 },
    { "Score": 4 },
    { "Score": 3 },
    { "Score": 1 }
  ],
  [
    { "Score": 4 },
    { "Score": 3 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 4 },
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  [
    { "Score": 2 },
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 4 }
  ],
  [
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 4 }
  ],
  [
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 3 },
    { "Score": 4 }
  ],
  [
    { "Score": 4 },
    { "Score": 3 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 2 },
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 3 }
  ],
  [
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 4 },
    { "Score": 2 }
  ]
];


const ranges = {
  "0-50": "Not suitable",
  "51-80": "Potentially suitable",
  "81-100": "Well-suited",
  "101-999": "Highly suitable"
};



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

    try {
      
      await setDoc(doc(answerKeyCollection,'ranges'), ranges);
      console.log(`Ranges uploaded`);
    } catch (error) {
      console.error(`Error uploading ranges`,error);
    }

}



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
    }
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
const plansIndia = {
  credits: [
    { title: "1 Credit", credits: 1, price: 199, originalPrice: 199, planID: 'C1' },
    { title: "3 Credits", credits: 3, price: 499, originalPrice: 599, planID: 'C3' },
    { title: "5 Credits", credits: 5, price: 799, originalPrice: 999, planID: 'C5' },
    { title: "9 Credits", credits: 9, price: 1499, originalPrice: 1799, planID: 'C9' },
    { title: "12 Credits", credits: 12, price: 1999, originalPrice: 2399, planID: 'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment", appointment: true, price: 1999, originalPrice: 1999, planID: 'CO1' },
  ],
  bundle: [
    { title: "3 Credits + online/offline career counseling", appointment: true, credits: 3, price: 2499, originalPrice: 2796, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling", appointment: true, credits: 5, price: 2999, originalPrice: 3194, planID: 'CB5' },
  ]
};

const plansUS = {
  credits: [
    { title: "1 Credit", credits: 1, price: 10, originalPrice: 10, planID: 'C1' },
    { title: "3 Credits", credits: 3, price: 25, originalPrice: 30, planID: 'C3' },
    { title: "5 Credits", credits: 5, price: 40, originalPrice: 50, planID: 'C5' },
    { title: "9 Credits", credits: 9, price: 80, originalPrice: 90, planID: 'C9' },
    { title: "12 Credits", credits: 12, price: 100, originalPrice: 120, planID: 'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment", appointment: true, price: 60, originalPrice: 60, planID: 'CO1' },
  ],
  bundle: [
    { title: "3 Credits + online/offline career counseling", appointment: true, credits: 3, price: 75, originalPrice: 90, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling", appointment: true, credits: 5, price: 90, originalPrice: 110, planID: 'CB5' },
  ]
};


async function pushPlansToFirebase(plans, currency) {
  const db = getFirestore()
  try {
    for (const category in plans) {
      for (const plan of plans[category]) {
        const planRef = doc(collection(db, 'pricing-plans', currency, 'plans'), plan.planID);
        await setDoc(planRef, plan);
      }
    }
    console.log(`${currency} data added successfully`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


const formatDate = (date) => {
  const options = { 
    day: '2-digit', 
    month: '2-digit', 
    year: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const parseDate = (dateString) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/;
  const alreadyFormattedRegex = /^\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2} (AM|PM)$/i;

  if (alreadyFormattedRegex.test(dateString)) {
    console.log(`Already in correct format: ${dateString}`);
    return { formattedDate: dateString, alreadyCorrect: true };
  }

  if (regex.test(dateString)) {
    const [datePart, timePart] = dateString.split(', ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');
    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    return { formattedDate: formatDate(date), alreadyCorrect: false };
  }

  throw new Error(`Invalid date format: ${dateString}`);
};

const reformatDates = async () => {
  let errorCount = 0;
  let fixedCount = 0;
  let correctFormatCount = 0;

  try {
    const usersCollection = await collection(firestore, "users");
    const querySnapshot = await getDocs(usersCollection);

    for (const doc of querySnapshot.docs) {
      const uid = doc.data().uid;
      const testsTakenRef = collection(doc.ref, "tests-taken");
      const testsSnapshot = await getDocs(testsTakenRef);

      for (const testDoc of testsSnapshot.docs) {
        const testData = testDoc.data();
        if (testData.time) {
          try {
            const { formattedDate, alreadyCorrect } = parseDate(testData.time);
            if (!alreadyCorrect) {
              await updateDoc(testDoc.ref, { time: formattedDate });
              fixedCount++;
              console.log(`Updated document ${testDoc.id} with formatted date ${formattedDate}`);
            } else {
              correctFormatCount++;
            }
          } catch (error) {
            errorCount++;
            console.error(`Error updating document ${testDoc.id} for user ${uid} with existing time ${testData.time}: `, error);
          }
        }
      }
    }

    console.log("All dates reformatted successfully!");
  } catch (error) {
    console.error("Error reformating dates: ", error);
  }

  console.log(`Total errors: ${errorCount}`);
  console.log(`Total fixed: ${fixedCount}`);
  console.log(`Total already correct: ${correctFormatCount}`);
};


