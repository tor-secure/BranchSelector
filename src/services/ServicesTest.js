import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import { getRemainingTests, getTestLogo } from "../Components/Tests/testService"
import { addBlogPost, deleteCoupon, fetchAllUsers, fetchUserTests, generateCoupon, getAllCoupons, getBlogPosts, getDownloadsCount } from "./adminServices"
import { getCurrentUser, isSignedIn, syncUserData } from "./authService"
import { canTakeTest, getCurrentUserInfo, getTestHistory, newTestTaken, updateDownloads, validateCouponCode } from "./userService"




const ServicesTest= () =>{
 
async function getD()
{
  const c = {
    code: "FREE300",
    "price-after-discount": 100,
    "valid-from": '11/01/2003',
    "valid-till": '11/01/2025',
    limit: 50,

  }


  //console.log(await generateCoupon(c.code,c["price-after-discount"],c["valid-from"],c["valid-till"],c.limit,3))

  console.log(await getAllCoupons())

}

const style = {
  marginTop : '20%'
}


return(
    <>
    <img src = {getTestLogo('Brain Test')}></img>
    <button onClick={async ()=>{await getD();}} style = {style}>sadasdfdsfsd</button>
    </>
)

}

export {ServicesTest}




function putDataToFireStore(){
  const db = getFirestore()

  const testName = 'strength';
  const testCode = 'STR' // Replace with your test name
  const questionData =  [
    
    ]
  
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

 