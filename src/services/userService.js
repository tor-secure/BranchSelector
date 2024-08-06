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

import { getCurrentUser } from "./authService.js";
import { toast } from "react-toastify";
import { sendTestResultsMail } from "./testService.js";

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

  const testDetails = {
    "test-name": testName,
    result: JSON.stringify(result),
    time: formatDate(new Date()),
  };

  try {
    if (!(await canTakeTest())) {
      return;
    }

    let userId = await getCurrentUser();
    userId = userId.uid;

    const usersCollection = await collection(firestore, "users");
    const querySnapshot = await getDocs(
      query(usersCollection, where("uid", "==", userId))
    );
    if (querySnapshot.size !== 1) {
      console.log("No or multiple user documents found!");
      return;
    }

    const doc = querySnapshot.docs[0];
    var credit = doc.data().credit;
    credit -= 1;
    await updateDoc(doc.ref, { credit });
    const testsCollectionRef = collection(doc.ref, "tests-taken");
    await addDoc(testsCollectionRef, testDetails);
 

  } catch (error) {
    console.error("Error writing document: ", error);
  }

  await sendTestResultsMail(testName, result);
};

// Checks if the user is allowed to take a test based on the credits in their account
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
    return false;
  } else {
    return true;
  }
};

// Retrieves the test history of the current user
const getTestHistory = async () => {
  try {
    const temp = await getCurrentUser();
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

//IMPORTANT: Defination of voucher and coupon are flipped in usage. Might correct it sometime later.

// Validate if a discount coupon exists, is under usage limit and is within the expriation dates.
const validateDiscountVoucher = async (voucherCode) => {
  const toastId = toast.loading("Validating voucher...", { autoClose: false, draggable: true });
  
  try {
    const vouchersCollection = collection(firestore, 'vouchers');
    const voucherQuery = query(vouchersCollection, where('code', '==', voucherCode));
    const voucherSnapshot = await getDocs(voucherQuery);

    if (voucherSnapshot.size !== 1) {
      toast.update(toastId, {
        render: "Voucher code does not exist.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
      return null;
    }

    const voucherDoc = voucherSnapshot.docs[0];
    const voucherData = voucherDoc.data();
    const startingDate = new Date(voucherData["validFrom"]);
    const endingDate = new Date(voucherData["validTill"]);
    const discountPercentage = voucherData.discountPercentage;
    const limit = voucherData.limit;
    const redeemed = voucherData.redeemed || 0;
    const currentDate = new Date();

    if (currentDate >= startingDate && currentDate <= endingDate) {
      if (redeemed >= limit) {
        toast.update(toastId, {
          render: "Voucher code has reached its limit.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          draggable: true
        });
        return null;
      }

      toast.update(toastId, {
        render: `Voucher validated!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });

      return discountPercentage;
    } else {

      toast.update(toastId, {
        render: "Voucher code is expired.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
      return null;
    }
  } catch (error) {
    console.error("Error validating voucher:", error);
    toast.update(toastId, {
      render: "Error validating voucher.",
      type: "error",
      isLoading: false,
      autoClose: 3000,
      draggable: true
    });
    throw new Error("Error validating voucher.");
  }
};



// Validates a voucher and returns the credits to be added
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

// Redeem the entered voucher, update the users count of credits.
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
      toast.update(toastId, {
        render: "User does not exist.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        draggable: true
      });
      return;
    }

    const userDoc = userSnapshot.docs[0];
    const userRef = userDoc.ref;
    const userData = userDoc.data();
    const currentCredits = userData.credit || 0;
    const newCredits = currentCredits + creditsToBeAdded;

    // Check if the coupon has already been redeemed
    const redeemedCoupons = userData.redeemedCoupons || [];
    if (redeemedCoupons.includes(couponCode)) {

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



    // Update the redeemed count for the coupon
    const couponQuery = query(couponCollection, where('code', '==', couponCode));
    const couponSnapshot = await getDocs(couponQuery);

    if (!couponSnapshot.empty) {
      const couponDoc = couponSnapshot.docs[0];
      const couponRef = couponDoc.ref;
      const couponData = couponDoc.data();
      const newRedeemedCount = (couponData.redeemed || 0) + 1;
      await updateDoc(couponRef, { redeemed: newRedeemedCount });
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


// Updates the number of downloads for a specific asset. NOT USED.
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


// Retrieves the current user's information from the database
const getCurrentUserInfo = async () => {
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
  return doc.data()

};

// Retrives the credits remaining in the user's account
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
  getRemainingCredits,
  getCurrentUserInfo,
  redeemCoupon,
  validateDiscountVoucher
};
