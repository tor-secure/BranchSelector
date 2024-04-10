import { auth, getCurrentUser, logout } from "../../services/authService";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "../../services/firebase";
import { evaluteTest, getTestQuestions } from "../../services/testService";
import { getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const ServicesTest = () => {
  async function getD() {
    const du = {
      ENGQ1: "ENGO2",
      ENGQ2: "ENGO1",
    };
    //console.log(await generateCoupon(c.code,c["price-after-discount"],c["valid-from"],c["valid-till"],c.limit,3))
    console.log(await updateUsers());
  }

  const style = {
    marginTop: "20%",
  };

  return (
    <>
      <button
        onClick={async () => {
        //  await getD();
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


async function putDataToFireStore() {
  const db = getFirestore();

  const testName = "english";
  const testCode = "ENG"; // Replace with your test name
  const questionData = [
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

  // Store questions and options
  const testQuestionsCollection = collection(db, "test-content");
  const testQuestionsDocRef = doc(testQuestionsCollection, testName);
  const contentCollection = collection(testQuestionsDocRef, "questions");
  const answerKeyCollection = collection(testQuestionsDocRef, "answer-key");

  const answerKey = [
    2, 2, 2, 1, 2, 2, 3, 1, 2, 3, 2, 1, 1, 1, 4, 1, 2, 1, 1, 3, 1, 1, 4, 2, 2,
    1, 3, 1, 2,
  ];

  const answers = {};

  questionData.forEach((question, index) => {
    const questionId = `${testCode}Q${index + 1}`;
    const questionDocRef = doc(contentCollection, questionId);
    //const answerKeyDocRef = doc(answerKeyCollection, questionId);

    var answer = "ENGO" + answerKey[index].toString();
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

  const testName = "engineering";
  const testCode = "EGG"; // Replace with your test code

  const questions = [];
  const weights = [];

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
