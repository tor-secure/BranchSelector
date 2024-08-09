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

  const testName = "creativity";
  const testCode = "CRE"; // Replace with your test name
const questionData = [
  {
    question: "How often do you come up with new ideas?",
    options: [
      "Occasionally.",
      "Very frequently.",
      "Rarely.",
      "Often."
    ]
  },
  {
    question: "How do you handle challenges or problems?",
    options: [
      "I enjoy finding unique and creative solutions.",
      "I seek traditional solutions.",
      "I get overwhelmed and avoid them.",
      "I brainstorm multiple solutions."
    ]
  },
  {
    question: "How do you express your creativity?",
    options: [
      "I explore various artistic outlets like drawing, writing, or music.",
      "I don't often express it.",
      "I occasionally work on creative projects.",
      "I try to incorporate creativity into everyday tasks."
    ]
  },
  {
    question: "How do you feel about taking risks in your work or projects?",
    options: [
      "I prefer to stick with what I know.",
      "I am cautious but willing to take calculated risks.",
      "I avoid risks altogether.",
      "I thrive on taking risks and exploring new possibilities."
    ]
  },
  {
    question: "How do you approach learning new skills?",
    options: [
      "I am excited to try new things and experiment.",
      "I prefer to stick to familiar skills.",
      "I am willing to learn but take my time.",
      "I learn new skills occasionally."
    ]
  },
  {
    question: "How do you generate new ideas?",
    options: [
      "I get inspired by different sources and combine ideas.",
      "I rely on tried-and-true methods.",
      "I come up with ideas randomly.",
      "I brainstorm and use creative thinking techniques."
    ]
  },
  {
    question: "How do you respond to feedback on your creative work?",
    options: [
      "I use feedback to improve and refine my ideas.",
      "I feel discouraged by feedback.",
      "I occasionally consider feedback.",
      "I take feedback constructively but maintain my creative vision."
    ]
  },
  {
    question: "How do you find inspiration for your creative projects?",
    options: [
      "I struggle to find inspiration.",
      "I occasionally find inspiration in my surroundings.",
      "I actively seek out new experiences and ideas.",
      "I get inspired by the work of others."
    ]
  },
  {
    question: "How do you approach problem-solving?",
    options: [
      "I think outside the box and explore unconventional solutions.",
      "I follow standard procedures.",
      "I analyze the problem and try to find a unique approach.",
      "I solve problems as they arise without much planning."
    ]
  },
  {
    question: "How do you handle criticism of your creative ideas?",
    options: [
      "I take it as an opportunity to improve.",
      "I get discouraged and lose motivation.",
      "I consider it but often stick to my original ideas.",
      "I feel hurt but try to learn from it."
    ]
  },
  {
    question: "How do you balance creativity with practicality?",
    options: [
      "I find it hard to be both creative and practical.",
      "I focus mainly on creativity and less on practicality.",
      "I strike a balance between creativity and practical considerations.",
      "I lean more towards practicality but incorporate creativity when possible."
    ]
  },
  {
    question: "How do you feel about collaborating on creative projects?",
    options: [
      "I enjoy collaborating and believe it enhances creativity.",
      "I prefer working alone.",
      "I collaborate occasionally but prefer my own ideas.",
      "I am open to collaboration and find it useful."
    ]
  },
  {
    question: "How do you keep your creative skills sharp?",
    options: [
      "I rarely practice or enhance my creative skills.",
      "I occasionally work on creative projects.",
      "I actively seek opportunities to use and improve my creativity.",
      "I practice creative activities regularly."
    ]
  },
  {
    question: "How do you handle creative blocks?",
    options: [
      "I take breaks and return with a fresh perspective.",
      "I give up when I hit a block.",
      "I push through the block until I find a solution.",
      "I struggle to overcome creative blocks."
    ]
  },
  {
    question: "How do you incorporate creativity into your daily life?",
    options: [
      "I find ways to be creative in everyday tasks.",
      "I don't actively seek to be creative daily.",
      "I incorporate creativity occasionally.",
      "I make a conscious effort to be creative every day."
    ]
  },
  {
    question: "How do you deal with uncertainty in creative projects?",
    options: [
      "I embrace uncertainty and see it as part of the process.",
      "I feel uncomfortable with uncertainty and avoid it.",
      "I manage uncertainty but prefer clear directions.",
      "I struggle with uncertainty but try to adapt."
    ]
  },
  {
    question: "How do you stay motivated on long creative projects?",
    options: [
      "I lose interest quickly.",
      "I break the project into smaller, manageable tasks.",
      "I stay motivated but need occasional breaks.",
      "I struggle to stay motivated throughout."
    ]
  },
  {
    question: "How do you approach new and unfamiliar creative fields?",
    options: [
      "I avoid them and stick to what I know.",
      "I am curious and excited to explore them.",
      "I am hesitant but willing to try.",
      "I feel intimidated and unsure."
    ]
  },
  {
    question: "How do you stay updated with creative trends?",
    options: [
      "I actively research and follow trends.",
      "I occasionally check out new trends.",
      "I am not interested in following trends.",
      "I find it hard to keep up with trends."
    ]
  },
  {
    question: "How do you approach feedback from peers on creative work?",
    options: [
      "I ignore feedback and do things my way.",
      "I take feedback constructively and make changes if necessary.",
      "I consider feedback but am hesitant to change.",
      "I welcome feedback and use it to enhance my work."
    ]
  }
];

const answerKey = [
  [
    { "Score": 1 },
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 2 }
  ],
  [
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 0 },
    { "Score": 2 }
  ],
  [
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  [
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 0 },
    { "Score": 3 }
  ],
  [
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  [
    { "Score": 0 },
    { "Score": 1 },
    { "Score": 3 },
    { "Score": 2 }
  ],
  [
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 0 },
    { "Score": 1 },
    { "Score": 3 },
    { "Score": 2 }
  ],
  [
    { "Score": 1 },
    { "Score": 0 },
    { "Score": 2 },
    { "Score": 3 }
  ],
  [
    { "Score": 0 },
    { "Score": 1 },
    { "Score": 3 },
    { "Score": 2 }
  ],
  [
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  [
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 2 },
    { "Score": 0 },
    { "Score": 1 },
    { "Score": 3 }
  ],
  [
    { "Score": 3 },
    { "Score": 0 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 0 },
    { "Score": 3 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 0 },
    { "Score": 3 },
    { "Score": 2 },
    { "Score": 1 }
  ],
  [
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 2 },
    { "Score": 0 }
  ],
  [
    { "Score": 3 },
    { "Score": 2 },
    { "Score": 0 },
    { "Score": 1 }
  ],
  [
    { "Score": 0 },
    { "Score": 3 },
    { "Score": 1 },
    { "Score": 2 }
  ]
];

const ranges = {
  "48-60": "Highly creative",
  "36-47": "Very creative",
  "24-35": "Moderately creative",
  "0-23": "Low creativity"
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


