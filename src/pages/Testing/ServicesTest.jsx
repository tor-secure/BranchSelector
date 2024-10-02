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
          console.log(await evaluteTest("engineering",{"EGGQ1":"3","EGGQ21":3,"EGGQ13":"5","EGGQ2":3,"EGGQ19":"5","EGGQ31":3,"EGGQ10":3,"EGGQ5":3,"EGGQ25":3,"EGGQ34":3,"EGGQ7":3,"EGGQ8":3,"EGGQ9":3,"EGGQ20":3,"EGGQ30":3,"EGGQ3":3,"EGGQ23":"5","EGGQ32":3,"EGGQ11":3,"EGGQ29":3,"EGGQ33":3,"EGGQ17":3,"EGGQ18":3,"EGGQ27":3,"EGGQ12":3,"EGGQ15":3,"EGGQ4":3,"EGGQ26":3,"EGGQ35":3,"EGGQ22":3}))
        }}
        style={style}
      >
        sadasdfdsfsd
      </button>
      <button onClick={async () => {console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)}} style={style}>
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
  }
  
];


const answerKey = [
  [
    { "Score": 3 },
    { "Score": 4 },
    { "Score": 1 },
    { "Score": 2 }
  ],
  
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


