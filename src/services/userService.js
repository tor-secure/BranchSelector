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
    const userId = getCurrentUser().uid;
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
    let testsTaken = doc.data().testsTaken;
    testsTaken++;
    await updateDoc(doc.ref, { testsTaken });
    const testsCollectionRef = collection(doc.ref, "tests-taken");
    await addDoc(testsCollectionRef, testDetails);
    console.log("Data written to Firestore successfully!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }

  await syncUserData();
};

// Checks if the user is allowed to take a test based on their account type and the number of tests taken
const canTakeTest = async () => {
  const userId = getCurrentUser().uid;
  const usersCollection = await collection(firestore, "users");
  const querySnapshot = await getDocs(
    query(usersCollection, where("uid", "==", userId))
  );
  if (querySnapshot.size != 1) {
    console.log("Invalid User");
    return;
  }
  const doc = querySnapshot.docs[0];

  let credits = doc.data().credits;

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
    const usersCollection = await collection(firestore, "users");
    const querySnapshot = await getDocs(
      query(usersCollection, where("uid", "==", userId))
    );
    if (querySnapshot.size != 1) {
      console.log("No or multiple user documents found!");
      return;
    }
    const doc = querySnapshot.docs[0];
    const testsCollectionRef = collection(doc.ref, "tests-taken");
    const testsSnapshot = getAllDocumentsFromCollection(testsCollectionRef);
    return testsSnapshot;
  } catch (error) {
    console.log("UserService: Something went wrong \n" + error);
    return {};
  }
};

// Upgrades the user's account
const upgradeAccount = async () => {
  // Implementation goes here
};

// Validates a coupon code and returns the new price if valid
const validateCouponCode = async (couponCode) => {
  const usersCollection = await collection(firestore, "coupons");
  const querySnapshot = await getDocs(
    query(usersCollection, where("code", "==", couponCode))
  );
  if (querySnapshot.size != 1) {
    console.log("Code Does not exist");
    return false;
  }

  const codeDoc = querySnapshot.docs[0];
  const couponData = codeDoc.data();
  const startingDate = couponData["valid-from"].toDate();
  const endingDate = couponData["valid-till"].toDate();
  const priceAfterDiscount = couponData.priceAfterDiscount;
  const limit = couponData.limit;
  const redeemed = couponData.redeemed;
  const currentDate = new Date();
  if (currentDate >= startingDate && currentDate <= endingDate) {
    console.log("Coupon code is valid.");

    if (redeemed >= limit) {
      console.log("Coupon limit reached");
    }
    return { newPrice: priceAfterDiscount };
  } else {
    console.log("Coupon code is expired.");
    return false;
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
  if (isSignedIn()) {
    if (!sessionStorage.getItem("userDetails")) {
      await syncUserData();
    }
    return JSON.parse(sessionStorage.getItem("userDetails"));
  }
};

export {
  canTakeTest,
  newTestTaken,
  getTestHistory,
  validateCouponCode,
  updateDownloads,
  getCurrentUserInfo,
};
