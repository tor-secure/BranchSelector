import { auth } from "../../services/authService"
import { collection, doc, getDocs, getFirestore, setDoc } from "../../services/firebase"
import { evaluteTest, getTestQuestions } from "../../services/testService"


const ServicesTest= () =>{
 
async function getD()
{


  const du = {
    'EGGQ3': 3,
    'EGGQ30': 5
   
  }
  //console.log(await generateCoupon(c.code,c["price-after-discount"],c["valid-from"],c["valid-till"],c.limit,3))
  console.log(await evaluteTest('engineering',du))

}

const style = {
  marginTop : '20%'
}


return(
    <>
    <button onClick={async ()=>{await getD();}} style = {style}>sadasdfdsfsd</button>
    </>
)

}

export {ServicesTest}




async function putDataToFireStore(){
  const db = getFirestore()

  const testName = 'engineering';
  const testCode = 'ENG' // Replace with your test name
  const questionData = []
  
  // Store questions and options
  const testQuestionsCollection = collection(db, 'test-content');
  const testQuestionsDocRef = doc(testQuestionsCollection, testName);
  const contentCollection = collection(testQuestionsDocRef, 'questions');
  const answerKeyCollection = collection(testQuestionsDocRef, 'answer-key');


  questionData.forEach((question, index) => {

 
    const questionId = `${testCode}Q${index + 1}`;
    const questionDocRef = doc(contentCollection, questionId);
    const answerKeyDocRef = doc(answerKeyCollection, questionId);

  
    const weights = {};
    const options = {};
    question.options.forEach((option, optionIndex) => {
      options[`${testCode}O${optionIndex + 1}`] = option.text;
      weights[`${testCode}O${optionIndex + 1}`] = option.score;
    });
  



    setDoc(questionDocRef, { question: question.question, options })
      .then(() => {
        console.log(`Question ${questionId} uploaded successfully`);
      })
      .catch((error) => {
        console.error(`Error uploading question ${questionId}:`, error);
      });


      setDoc(answerKeyDocRef, weights)
        .then(() => {
          console.log(`Answer key for ${questionId} uploaded successfully`);
        })
        .catch((error) => {
          console.error(`Error uploading answer key for ${questionId}:`, error);
        });
  });
  
 
  }


 async function putDataToFireStoreNew() {
  const db = getFirestore();

  const testName = 'engineering';
  const testCode = 'EGG'; // Replace with your test code

const questions = []
  const weights = []


console.log(weights.length)


  // Store questions and options along with weights
  const testQuestionsCollection = collection(db, 'test-content');
  const testQuestionsDocRef = doc(testQuestionsCollection, testName);
  const contentCollection = collection(testQuestionsDocRef, 'questions');
  const answerKeyCollection = collection(testQuestionsDocRef, 'answer-key');

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

  const testName = 'iq';
  const testCode = 'IQT'; // Replace with your test code

  const questionSet = [
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/1/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/1/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/1/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/1/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/1/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/1/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/1/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/2/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/2/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/2/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/2/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/2/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/2/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/2/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/3/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/3/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/3/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/3/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/3/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/3/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/3/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/4/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/4/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/4/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/4/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/4/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/4/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/4/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/5/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/5/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/5/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/5/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/5/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/5/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/5/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/6/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/6/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/6/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/6/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/6/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/6/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/6/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/7/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/7/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/7/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/7/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/7/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/7/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/7/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/8/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/8/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/8/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/8/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/8/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/8/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/8/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/9/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/9/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/9/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/9/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/9/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/9/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/9/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/10/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/10/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/10/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/10/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/10/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/10/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/10/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/11/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/11/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/11/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/11/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/11/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/11/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/11/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/12/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/12/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/12/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/12/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/12/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/12/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/12/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/13/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/13/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/13/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/13/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/13/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/13/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/13/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/14/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/14/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/14/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/14/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/14/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/14/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/14/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/15/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/15/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/15/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/15/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/15/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/15/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/15/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/16/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/16/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/16/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/16/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/16/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/16/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/16/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/17/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/17/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/17/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/17/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/17/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/17/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/17/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/18/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/18/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/18/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/18/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/18/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/18/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/18/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/19/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/19/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/19/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/19/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/19/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/19/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/19/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/20/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/20/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/20/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/20/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/20/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/20/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/20/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/21/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/21/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/21/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/21/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/21/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/21/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/21/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/22/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/22/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/22/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/22/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/22/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/22/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/22/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/23/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/23/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/23/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/23/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/23/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/23/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/23/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/24/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/24/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/24/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/24/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/24/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/24/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/24/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/25/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/25/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/25/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/25/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/25/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/25/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/25/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/26/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/26/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/26/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/26/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/26/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/26/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/26/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/27/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/27/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/27/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/27/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/27/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/27/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/27/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/28/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/28/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/28/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/28/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/28/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/28/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/28/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/29/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/29/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/29/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/29/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/29/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/29/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/29/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/30/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/30/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/30/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/30/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/30/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/30/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/30/F.png"
    },
    {
      "question": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/31/question.png",
      "A": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/31/A.png",
      "B": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/31/B.png",
      "C": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/31/C.png",
      "D": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/31/D.png",
      "E": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/31/E.png",
      "F": "https://raw.githubusercontent.com/tor-secure/iq-test-images/main/31/F.png"
    },

    
  ]

  const answerKey =[
    1, 5, 6, 6, 4, 5, 5, 3, 4, 4, 1, 1, 2, 3, 6, 2, 2, 3, 6, 6, 5, 6, 1, 6, 5,
    6, 6, 1, 1, 3, 5
  ];

  console.log(answerKey.length, questionSet.length)

  const contentCollection = collection(db, 'test-content');
  const testQuestionsDocRef = doc(contentCollection, testName);
        const answers = {}
  questionSet.forEach((question, index) => {
    const questionId = `${testCode}Q${index + 1}`;
    const questionDocRef = doc(testQuestionsDocRef, 'questions', questionId);

    const options = {};

    Object.keys(question).forEach((key) => {
      if (key !== "question") {
        const optionId = 'IQTO'+ (key.charCodeAt(0) - 65 + 1).toString(); // Convert A/B/C to 1/2/3
        options[optionId] = question[key];
      }
    });

    const questionData = {
      question: question["question"],
      options: options
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
    var answer ='IQTO' + (answerKey[index]).toString();
    answers[questionId] = answer
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
    const answerKeyDocRef = doc(testQuestionsDocRef, 'answer-key', 'answers');
    setDoc(answerKeyDocRef, answers)
      .then(() => {
        console.log(`Answer key uploaded successfully`);
      })
      .catch((error) => {
        console.error(`Error uploading answer key for ${questionId}:`, error);
      });
}


 