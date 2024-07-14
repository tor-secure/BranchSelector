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

  const testName = "career";
  const testCode = "CAR"; // Replace with your test name
 const questionData = [
  {
    question: "When faced with a problem, I prefer to:",
    options: [
      "Analyze it thoroughly",
      "Seek advice from others",
      "Take quick action",
      "Collaborate with a team",
      "Look for creative solutions"
    ]
  },
  {
    question: "In a team project, I am most likely to:",
    options: [
      "Organize tasks and set deadlines",
      "Listen to others' ideas and build consensus",
      "Take the lead and make decisions",
      "Communicate effectively with team members",
      "Innovate and suggest new approaches"
    ]
  },
  {
    question: "When learning a new skill, I prefer:",
    options: [
      "Reading and researching",
      "Learning from hands-on experience",
      "Watching tutorials or demonstrations",
      "Working with others",
      "Experimenting and trying things out"
    ]
  },
  {
    question: "My favorite subjects in school were:",
    options: [
      "Math and Science",
      "Languages and Literature",
      "Art and Music",
      "Physical Education and Sports",
      "History and Social Sciences"
    ]
  },
  {
    question: "I am motivated by:",
    options: [
      "Achieving tangible results",
      "Helping others succeed",
      "Expressing creativity",
      "Collaborating with a team",
      "Solving complex problems"
    ]
  },
  {
    question: "When faced with a challenge at work, I am likely to:",
    options: [
      "Develop a detailed plan of action",
      "Collaborate with colleagues for solutions",
      "Innovate and try new approaches",
      "Communicate effectively with stakeholders",
      "Analyze data and trends"
    ]
  },
  {
    question: "My ideal work environment is:",
    options: [
      "Structured and organized",
      "Collaborative and team-oriented",
      "Dynamic and fast-paced",
      "Creative and innovative",
      "Clear goals and direction"
    ]
  },
  {
    question: "In my free time, I enjoy:",
    options: [
      "Solving puzzles or brain teasers",
      "Volunteering or helping others",
      "Creating art, music, or writing",
      "Playing team sports or engaging in physical activities",
      "Learning new skills or exploring new interests"
    ]
  },
  {
    question: "When making important decisions, I rely on:",
    options: [
      "Logical reasoning and analysis",
      "Intuition and gut feelings",
      "Advice from trusted individuals",
      "Considering ethical implications",
      "Balancing risks and rewards"
    ]
  },
  {
    question: "I excel in:",
    options: [
      "Planning and organizing events or activities",
      "Negotiating and mediating conflicts",
      "Developing creative solutions to problems",
      "Adapting to changing situations",
      "Analyzing complex data"
    ]
  },
  {
    question: "When communicating with others, I am best at:",
    options: [
      "Presenting complex information clearly",
      "Listening actively and empathetically",
      "Persuading and influencing opinions",
      "Resolving conflicts and finding common ground",
      "Avoiding confrontations or difficult conversations"
    ]
  },
  {
    question: "My career goals include:",
    options: [
      "Advancing to a leadership position",
      "Making a positive impact on society",
      "Expressing my creativity and innovation",
      "Achieving work-life balance and personal fulfillment",
      "Specializing in a specific field or industry"
    ]
  },
  {
    question: "When faced with a setback, I:",
    options: [
      "Analyze the situation and learn from it",
      "Seek support from friends or mentors",
      "Explore new opportunities or directions",
      "Take time to reflect and reassess goals",
      "Feel defeated and give up"
    ]
  },
  {
    question: "I prefer a job that offers:",
    options: [
      "Clear career progression and development",
      "Opportunities to work with diverse groups of people",
      "Freedom to innovate and explore new ideas",
      "Flexibility in work hours and location",
      "Stability and predictability"
    ]
  },
  {
    question: "In my previous work experiences, I have been praised for:",
    options: [
      "Efficiency and productivity",
      "Collaboration and teamwork",
      "Creativity and innovative thinking",
      "Adaptability and flexibility",
      "Analytical thinking and problem-solving"
    ]
  },
  {
    question: "When planning a project, I focus most on:",
    options: [
      "Setting clear goals and milestones",
      "Building strong relationships with team members",
      "Generating new ideas and approaches",
      "Avoiding mistakes and risks",
      "Analyzing potential outcomes and scenarios"
    ]
  },
  {
    question: "My strongest skills are in:",
    options: [
      "Analyzing data and trends",
      "Communicating effectively with others",
      "Creating or designing visual content",
      "Managing time and priorities",
      "Working collaboratively with diverse teams"
    ]
  },
  {
    question: "When learning new software or technology, I:",
    options: [
      "Prefer to read manuals and follow instructions",
      "Learn best through hands-on experimentation",
      "Watch tutorials or online videos",
      "Prefer to learn from others who are already proficient",
      "Like to explore and discover features on my own"
    ]
  },
  {
    question: "My preferred method of receiving feedback is:",
    options: [
      "Detailed analysis and constructive criticism",
      "Positive reinforcement and encouragement",
      "Practical advice for improvement",
      "Avoiding feedback altogether",
      "Collaboration and discussion for mutual understanding"
    ]
  },
  {
    question: "When evaluating a job offer, I prioritize:",
    options: [
      "Opportunities for career advancement",
      "Company culture and values alignment",
      "Compensation and benefits package",
      "Work-life balance and flexibility",
      "Job stability and security"
    ]
  },
  {
    question: "I am most interested in careers that involve:",
    options: [
      "Analyzing data to make informed decisions",
      "Helping and serving others in need",
      "Creating or designing new products or solutions",
      "Working outdoors or with physical tasks",
      "Leading teams and achieving strategic goals"
    ]
  },
  {
    question: "My approach to networking is:",
    options: [
      "Strategic and focused on professional goals",
      "Genuine and building personal connections",
      "Attending events and meeting new people",
      "Avoiding networking events altogether",
      "Using networking to explore new opportunities"
    ]
  },
  {
    question: "My ideal career path involves:",
    options: [
      "Specializing in a specific field or industry",
      "Developing skills across various domains",
      "Creating my own business or startup",
      "Having a stable job with consistent routines",
      "Advancing to leadership roles"
    ]
  },
  {
    question: "When facing a difficult ethical dilemma at work, I:",
    options: [
      "Analyze the situation from different perspectives",
      "Seek advice from colleagues or mentors",
      "Act based on personal values and principles",
      "Avoid making decisions in such situations",
      "Innovate and find alternative solutions"
    ]
  },
  {
    question: "My preferred method of professional development is:",
    options: [
      "Pursuing advanced degrees or certifications",
      "Attending workshops, seminars, or conferences",
      "Engaging in self-directed learning and projects",
      "Not actively seeking professional development",
      "Learning through hands-on experience and practice"
    ]
  },
  {
    question: "When assigned a new project, I am most concerned about:",
    options: [
      "Meeting deadlines and quality standards",
      "Ensuring effective communication within the team",
      "Innovating and finding new solutions",
      "Avoiding mistakes and setbacks",
      "Adapting to unexpected changes and challenges"
    ]
  },
  {
    question: "I am most energized when:",
    options: [
      "Solving complex problems or challenges",
      "Collaborating with others on a meaningful project",
      "Creating something new or innovative",
      "Maintaining a steady routine and predictable tasks",
      "Leading a team towards a common goal"
    ]
  },
  {
    question: "My long-term career aspirations include:",
    options: [
      "Achieving leadership roles in my field",
      "Making significant contributions to society",
      "Advancing my skills and knowledge continuously",
      "Achieving work-life balance and personal fulfillment",
      "Specializing in a specific area of expertise"
    ]
  },
  {
    question: "My ideal work-life balance involves:",
    options: [
      "Clearly defined work hours and boundaries",
      "Integrating work with personal interests",
      "Pursuing personal growth and development outside of work",
      "Prioritizing personal life over professional ambitions",
      "Balancing professional challenges with personal well-being"
    ]
  },
  {
    question: "When faced with a tight deadline, I:",
    options: [
      "Focus intensively and work efficiently",
      "Collaborate closely with others to meet the deadline",
      "Find creative solutions to finish on time",
      "Feel stressed and struggle to meet expectations",
      "Plan and prioritize tasks to meet the deadline"
    ]
  }
];


 const answerKey = [
  [
    {"Analytical Skills": 5},
    {"Communication Skills": 4, "Teamwork": 3},
    {"Decision Making": 5, "Analytical Skills": -2},
    {"Teamwork": 5, "Decision Making": -1},
    {"Creative Problem Solving": 5, "Analytical Skills": -1}
  ],
  [
    {"Organizational Skills": 5, "Leadership": 2},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Leadership": 5, "Teamwork": -1},
    {"Communication Skills": 5},
    {"Creative Problem Solving": 5, "Organizational Skills": -1}
  ],
  [
    {"Analytical Skills": 4, "Creative Problem Solving": -1},
    {"Decision Making": 4, "Analytical Skills": -1},
    {"Communication Skills": 3, "Analytical Skills": 2},
    {"Teamwork": 4, "Decision Making": -1},
    {"Creative Problem Solving": 5, "Organizational Skills": -2}
  ],
  [
    {"Analytical Skills": 5, "Creative Problem Solving": -1},
    {"Communication Skills": 5, "Analytical Skills": -1},
    {"Creative Problem Solving": 5, "Analytical Skills": -2},
    {"Teamwork": 4, "Decision Making": 2},
    {"Analytical Skills": 4, "Communication Skills": 3}
  ],
  [
    {"Decision Making": 4, "Organizational Skills": 3},
    {"Teamwork": 5, "Leadership": 2},
    {"Creative Problem Solving": 5, "Analytical Skills": -1},
    {"Teamwork": 5, "Decision Making": -1},
    {"Analytical Skills": 5, "Creative Problem Solving": 2}
  ],
  [
    {"Organizational Skills": 5, "Decision Making": 2},
    {"Teamwork": 4, "Creative Problem Solving": 2},
    {"Creative Problem Solving": 5, "Organizational Skills": -1},
    {"Communication Skills": 4, "Leadership": 2},
    {"Analytical Skills": 5, "Creative Problem Solving": -1}
  ],
  [
    {"Organizational Skills": 4, "Creative Problem Solving": -2},
    {"Teamwork": 4, "Decision Making": -1},
    {"Decision Making": 3, "Organizational Skills": -1},
    {"Creative Problem Solving": 4, "Analytical Skills": -1},
    {"Organizational Skills": 4, "Leadership": 2}
  ],
  [
    {"Analytical Skills": 5, "Creative Problem Solving": 2},
    {"Teamwork": 5, "Communication Skills": 2},
    {"Creative Problem Solving": 5, "Analytical Skills": -1},
    {"Teamwork": 4, "Decision Making": 2},
    {"Creative Problem Solving": 4, "Analytical Skills": 2}
  ],
  [
    {"Analytical Skills": 5, "Creative Problem Solving": -1},
    {"Decision Making": 4, "Analytical Skills": -2},
    {"Communication Skills": 4, "Teamwork": 2},
    {"Decision Making": 3, "Leadership": 2},
    {"Decision Making": 4, "Analytical Skills": 2}
  ],
  [
    {"Organizational Skills": 5, "Leadership": 2},
    {"Communication Skills": 4, "Leadership": 3},
    {"Creative Problem Solving": 5, "Analytical Skills": 2},
    {"Decision Making": 4, "Organizational Skills": -1},
    {"Analytical Skills": 5, "Creative Problem Solving": 1}
  ],
  [
    {"Communication Skills": 5, "Analytical Skills": 2},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Leadership": 4, "Communication Skills": 3},
    {"Communication Skills": 4, "Teamwork": 3},
    {"Decision Making": -2, "Communication Skills": -2}
  ],
  [
    {"Leadership": 5, "Decision Making": 2},
    {"Teamwork": 4, "Leadership": 2},
    {"Creative Problem Solving": 5, "Analytical Skills": -1},
    {"Decision Making": 4, "Organizational Skills": 2},
    {"Analytical Skills": 3, "Creative Problem Solving": 2}
  ],
  [
    {"Analytical Skills": 4, "Decision Making": 2},
    {"Teamwork": 3, "Communication Skills": 2},
    {"Creative Problem Solving": 4, "Decision Making": 2},
    {"Decision Making": 4, "Analytical Skills": 2},
    {"Decision Making": -1, "Leadership": -2}
  ],
  [
    {"Organizational Skills": 4, "Leadership": 2},
    {"Teamwork": 4, "Communication Skills": 2},
    {"Creative Problem Solving": 4, "Decision Making": 2},
    {"Decision Making": 4, "Organizational Skills": -1},
    {"Organizational Skills": 3, "Creative Problem Solving": -2}
  ],
  [
    {"Organizational Skills": 4, "Decision Making": 2},
    {"Teamwork": 4, "Communication Skills": 2},
    {"Creative Problem Solving": 5, "Analytical Skills": 1},
    {"Decision Making": 4, "Organizational Skills": -1},
    {"Analytical Skills": 5, "Creative Problem Solving": 2}
  ],
  [
    {"Organizational Skills": 5, "Leadership": 2},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Creative Problem Solving": 5, "Organizational Skills": -1},
    {"Decision Making": 4, "Analytical Skills": -1},
    {"Analytical Skills": 5, "Decision Making": 2}
  ],
  [
    {"Analytical Skills": 5, "Creative Problem Solving": -1},
    {"Communication Skills": 5, "Analytical Skills": -1},
    {"Creative Problem Solving": 5, "Analytical Skills": -1},
    {"Organizational Skills": 4, "Decision Making": 2},
    {"Teamwork": 5, "Communication Skills": 2}
  ],
  [
    {"Analytical Skills": 3, "Creative Problem Solving": -1},
    {"Creative Problem Solving": 4, "Decision Making": 2},
    {"Communication Skills": 3, "Analytical Skills": 2},
    {"Teamwork": 3, "Communication Skills": 2},
    {"Creative Problem Solving": 3, "Analytical Skills": 2}
  ],
  [
    {"Analytical Skills": 4, "Communication Skills": 2},
    {"Communication Skills": 3, "Teamwork": 2},
    {"Communication Skills": 4, "Decision Making": 2},
    {"Decision Making": -1, "Communication Skills": -2},
    {"Teamwork": 4, "Communication Skills": 3}
  ],
  [
    {"Organizational Skills": 4, "Leadership": 2},
    {"Teamwork": 4, "Decision Making": 2},
    {"Decision Making": 3, "Analytical Skills": 2},
    {"Decision Making": 4, "Organizational Skills": 2},
    {"Organizational Skills": 4, "Decision Making": 2}
  ],
  [
    {"Analytical Skills": 5, "Decision Making": 2},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Creative Problem Solving": 5, "Analytical Skills": 1},
    {"Decision Making": 3, "Teamwork": 2},
    {"Leadership": 5, "Organizational Skills": 2}
  ],
  [
    {"Communication Skills": 4, "Leadership": 2},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Communication Skills": 3, "Teamwork": 2},
    {"Communication Skills": -1, "Teamwork": -2},
    {"Decision Making": 4, "Communication Skills": 2}
  ],
  [
    {"Analytical Skills": 4, "Creative Problem Solving": 2},
    {"Creative Problem Solving": 4, "Decision Making": 2},
    {"Leadership": 4, "Decision Making": 3},
    {"Organizational Skills": 4, "Creative Problem Solving": -2},
    {"Leadership": 5, "Decision Making": 2}
  ],
  [
    {"Analytical Skills": 4, "Decision Making": 2},
    {"Teamwork": 3, "Communication Skills": 3},
    {"Decision Making": 4, "Leadership": 2},
    {"Decision Making": -1, "Leadership": -2},
    {"Creative Problem Solving": 4, "Decision Making": 2}
  ],
  [
    {"Analytical Skills": 3, "Leadership": 2},
    {"Communication Skills": 4, "Teamwork": 2},
    {"Creative Problem Solving": 4, "Decision Making": 2},
    {"Decision Making": -1, "Leadership": -2},
    {"Decision Making": 4, "Creative Problem Solving": 2}
  ],
  [
    {"Organizational Skills": 4, "Decision Making": 2},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Creative Problem Solving": 4, "Analytical Skills": 2},
    {"Decision Making": 3, "Creative Problem Solving": -1},
    {"Decision Making": 4, "Creative Problem Solving": 2}
  ],
  [
    {"Analytical Skills": 5, "Creative Problem Solving": 2},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Creative Problem Solving": 5, "Analytical Skills": 1},
    {"Organizational Skills": 3, "Creative Problem Solving": -2},
    {"Leadership": 4, "Teamwork": 3}
  ],
  [
    {"Leadership": 4, "Decision Making": 2},
    {"Teamwork": 4, "Creative Problem Solving": 2},
    {"Analytical Skills": 4, "Creative Problem Solving": 3},
    {"Decision Making": 4, "Organizational Skills": 2},
    {"Analytical Skills": 4, "Creative Problem Solving": 2}
  ],
  [
    {"Organizational Skills": 4, "Decision Making": 2},
    {"Creative Problem Solving": 3, "Decision Making": 2},
    {"Analytical Skills": 3, "Leadership": 2},
    {"Decision Making": 3, "Leadership": -2},
    {"Decision Making": 4, "Organizational Skills": 3}
  ],
  [
    {"Organizational Skills": 4, "Decision Making": 3},
    {"Teamwork": 4, "Communication Skills": 3},
    {"Creative Problem Solving": 4, "Analytical Skills": 2},
    {"Decision Making": -2, "Leadership": -2},
    {"Organizational Skills": 4, "Leadership": 2}
  ]
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
