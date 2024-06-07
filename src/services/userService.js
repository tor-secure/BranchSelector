import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  orderBy,
  query,
  app,
  where,
  deleteDoc,
  updateDoc,
} from "./firebase.js";

const firestore = getFirestore(app);

import { getCurrentUser, isSignedIn, syncUserData } from "./authService.js";
import { toast } from "react-toastify";

// Retrieves all documents from a Firestore collection
const getAllDocumentsFromCollection = async (collectionRef) => {
  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      documents.push({
        id: doc.id,
        ...data,
      });
    });
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

// Records a new test taken along with its details
const newTestTaken = async (testName, result) => {
  const testDetails = {
    "test-name": testName,
    result: JSON.stringify(result),
    time: new Date().toLocaleString(),
  };
  try {
    if (!(await canTakeTest())) {
      return;
    }
    let userId = await getCurrentUser();
    userId = userId.uid
    console.log("from new test", userId);

    const usersCollection = await collection(firestore, "users");
    const querySnapshot = await getDocs(
      query(usersCollection, where("uid", "==", userId))
    );
    if (querySnapshot.size != 1) {
      console.log("No or multiple user documents found!");
      return;
    }
    const doc = querySnapshot.docs[0];
    var credit = doc.data().credit;
    credit -= 1;
    console.log("credit updated to ",credit)
    await updateDoc(doc.ref, { credit });
    const testsCollectionRef = collection(doc.ref, "tests-taken");
    await addDoc(testsCollectionRef, testDetails);
    console.log("Data written to Firestore successfully!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }

};

// Checks if the user is allowed to take a test based on their account type and the number of tests taken
const canTakeTest = async () => {
  const userId = await getCurrentUser()
  const usersCollection = await collection(firestore, "users");
  const querySnapshot = await getDocs(
    query(usersCollection, where("uid", "==", userId.uid))
  );
  if (querySnapshot.size != 1) {
    console.log("Invalid User");
    return;
  }
  const doc = querySnapshot.docs[0];

  let credits = doc.data().credit;

  if (credits <= 0) {
    console.log("No more free tests");
    return false;
  } else {
    console.log("Can take test");
    return true;
  }
};

// Retrieves the test history of the current user
const getTestHistory = async () => {
  try {
    const temp = await getCurrentUser();
    //console.log("Userr", temp);
    const userId = temp.uid;
    const usersCollection = collection(firestore, "users");
    const querySnapshot = await getDocs(
      query(usersCollection, where("uid", "==", userId))
    );
    if (querySnapshot.size != 1) {
      console.log("No or multiple user documents found!");
      return;
    }
    const doc = querySnapshot.docs[0];
    const testsCollectionRef = collection(doc.ref, "tests-taken");
    const testsSnapshot = await getDocs(
      query(testsCollectionRef, orderBy("time", "desc"))
    );
    return testsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.log("UserService: Something went wrong \n" + error);
    return {};
  }
};


// Upgrades the user's account
const upgradeAccount = async () => {
  // Implementation goes here
};

// Validates a coupon code and returns the credits to be added
const validateCouponCode = async (couponCode) => {
  const usersCollection = await collection(firestore, "coupon");
  const querySnapshot = await getDocs(
    query(usersCollection, where("code", "==", couponCode))
  );
  if (querySnapshot.size != 1) {
    console.log("Code Does not exist");
    return {status:"fail",message:"Coupon does not exist"};
  }

  const codeDoc = querySnapshot.docs[0];
  const couponData = codeDoc.data();
  const startingDate = new Date(couponData["validFrom"]);
  const endingDate = new Date(couponData["validTill"]);
  const creditsToBeAdded = couponData.credit;
  const limit = couponData.limit;
  const redeemed = couponData.redeemed;
  const currentDate = new Date();
  if (currentDate >= startingDate && currentDate <= endingDate) {
    console.log("Coupon code is valid.");

    if (redeemed >= limit) {
      return {status:"fail",message:"Coupon Code has reached its limit!"}
    }
    return {status:"success", creditsToBeAdded: creditsToBeAdded };
  } else {
    console.log("Coupon code is expired.");
    return {status:"fail",message:"Coupon Code has expired"}
  }
};


const redeemCoupon = async (couponCode) => {
  const toastId = toast.loading("Validating coupon....", { autoClose: false, draggable: true });
  try {
    // Validate the coupon
    const validationResult = await validateCouponCode(couponCode);
    
    if (validationResult.status === "fail") {
      console.log("Invalid coupon code. No credits added.");
      toast.update(toastId, {
        render: validationResult.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
      return;
    }

    const { status, creditsToBeAdded } = validationResult;



    // Get the current user
    const currentUser = await getCurrentUser();
    const userUid = currentUser.uid;

    // Reference to the users collection
    const usersCollection = collection(firestore, 'users');
    const couponCollection = collection(firestore, 'coupon');
    const userQuery = query(usersCollection, where('uid', '==', userUid));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.log("User does not exist.");
      toast.update(toastId, {
        render: "User does not exist.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
      return;
    }

    // Assuming uid is unique and there is only one document in the snapshot
    const userDoc = userSnapshot.docs[0];
    const userRef = userDoc.ref;
    const userData = userDoc.data();
    const currentCredits = userData.credit || 0;
    const newCredits = currentCredits + creditsToBeAdded;

    // Check if the coupon has already been redeemed
    const redeemedCoupons = userData.redeemedCoupons || [];
    if (redeemedCoupons.includes(couponCode)) {
      console.log("You have already redeemed the coupon.");
      toast.update(toastId, {
        render: "You have already redeemed the coupon.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
      return;
    }


    // Update the user's credits
    await updateDoc(userRef, {
      credit: newCredits,
      redeemedCoupons: [...redeemedCoupons, couponCode]
    });

    console.log(`Credits updated successfully. New credits: ${newCredits}`);


    // Update the redeemed count for the coupon
    const couponQuery = query(couponCollection, where('code', '==', couponCode));
    const couponSnapshot = await getDocs(couponQuery);

    if (!couponSnapshot.empty) {
      const couponDoc = couponSnapshot.docs[0];
      const couponRef = couponDoc.ref;
      const couponData = couponDoc.data();
      const newRedeemedCount = (couponData.redeemed || 0) + 1;
      await updateDoc(couponRef, { redeemed: newRedeemedCount });
      console.log(`Coupon redeemed count updated to: ${newRedeemedCount}`);
      toast.update(toastId, {
        render: "Coupon redeemed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
    } else {
      console.log("Coupon document does not exist for updating redeemed count.");
      toast.update(toastId, {
        render: "Coupon document does not exist for updating redeemed count.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
    }

  } catch (error) {
    console.error("Error adding credits:", error);
    toast.update(toastId, {
      render: "Error adding credits.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
      draggable: true
    });
    throw new Error("Error adding credits.");
  }
};


// Updates the number of downloads for a specific asset
const updateDownloads = async (assetDownloaded) => {
  try {
    const collectionRef = await collection(firestore, "books-downloads");
    const documentRef = await getDocs(collectionRef);
    const currentValue = documentRef.docs[0].data()[assetDownloaded] || 0;
    console.log(currentValue);
    await updateDoc(documentRef.docs[0].ref, {
      [assetDownloaded]: currentValue + 1,
    });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

// Retrieves the current user's information
const getCurrentUserInfo = async () => {
  const uid = getCurrentUser().uid
/*DEPRECEATED*/

};

const getRemainingCredits = async () =>{
  const userId = await getCurrentUser()
  const usersCollection = await collection(firestore, "users");
  const querySnapshot = await getDocs(
    query(usersCollection, where("uid", "==", userId.uid))
  );
  if (querySnapshot.size != 1) {
    console.log("Invalid User");
    return;
  }
  const doc = querySnapshot.docs[0];
  return doc.data().credit;
}

export {
  canTakeTest,
  newTestTaken,
  getTestHistory,
  validateCouponCode,
  updateDownloads,
  getRemainingCredits,
  getCurrentUserInfo,
  redeemCoupon
};
