import {
  EmailAuthProvider,
  FacebookAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  setPersistence,
} from "firebase/auth";
import {
  app,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailLink,
  getFirestore,
  query,
  collection,
  where,
  addDoc,
  getDocs,
  deleteDoc,
} from "./firebase.js";
import { getCurrentUserInfo } from "./userService.js";

//All functions relating to authentication are defined here.

const auth = getAuth(app);
const firestore = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

//Function to add a listener to auth changes. Used in Protected Routes.
const addAuthChangeListener = (onChange) => {
  return onAuthStateChanged(auth, onChange);
};

// Function to register a new user with email and password
const registerWithEmailAndPassword = async (name, phoneNumber, email, password) => {

  //Create a new user using firebase email-password auth. 
  //Once new account is created, create a corresponding document in the user collection
  
  try {

    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const newUser = {
      authProvider: 'local',
      uid: user.uid,
      email: user.email,
      metadata: user.metadata ? JSON.stringify(user.metadata) : '',
      displayName: name,
      phoneNumber: user.phoneNumber ? user.phoneNumber : phoneNumber,
      photoUrl: user.photoURL ? user.photoURL : '',
      accountType: 'free',
      credit: 0,
    };

    const usersCollection = collection(firestore, 'users');
    await addDoc(usersCollection, newUser);
    await logger("SIGNUP")
    return { status: 'success', message: 'Sign up successful!' };
  } catch (error) {
    // Handle different error cases and return the appropriate status and message
    switch (error.code) {
      case 'auth/email-already-in-use':
        return { status: 'error', message: 'This email is already in use. Please choose a different email.' };
      case 'auth/weak-password':
        return { status: 'error', message: 'The password is too weak. Please choose a stronger password.' };
      case 'auth/invalid-email':
        return { status: 'error', message: 'The email address is invalid. Please enter a valid email address.' };
      default:
        console.error(error);
        return { status: 'error', message: 'An unexpected error occurred. Please try again later.' };
    }
  }
};

// Function to sign in with Google using Google OAuth provider
const signInWithGoogle = async ({ rememberMe }) => {
  //Signin with google. If new user, create corresponding user document in firebase
  try {
        const result = await signInWithPopup(auth, googleAuthProvider)
        const user = result.user;
        const newUser = {
            authProvider: 'google',
            uid: user.uid,
            email: user.email,
            metadata: JSON.stringify(user.metadata),
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            accountType: 'free',
            credit: 0
        };
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(query(usersCollection, where("uid", "==", user.uid)));
        if (querySnapshot.empty) {
            await addDoc(usersCollection, newUser);
            await logger("SIGNUP")
        }

        else
        await logger("LOGIN")
  
        return { success: true, user }; // Indicate successful login
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { success: false, error }; // Indicate failed login with error details
  }
};

//Signin with facebook. Not yet active.
const signInWithFacebook = async ({ rememberMe }) => {

  const logResult = await logger("LOGIN")
  if(!logResult)
  return { success: false, message: 'An unexpected error occurred. Please try again later.' };

  const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user;
        const newUser = {
            authProvider: 'facebook',
            uid: user.uid,
            email: user.email,
            metadata: JSON.stringify(user.metadata),
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            accountType: 'free',
            testsTaken: 0,
            credit: 0
        };
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(query(usersCollection, where("uid", "==", user.uid)));
        if (querySnapshot.empty) {
            await addDoc(usersCollection, newUser);
        }
    return { success: true, user }; // Indicate successful login
  } catch (error) {
    console.error("Sign-in failed:", error);
    return { success: false, error }; // Indicate failed login with error details
  }
};

// Function to login with email and password
const loginWithEmailAndPassword = async (email, password, { rememberMe }) => {
  try {
    // Set the appropriate persistence based on the 'rememberMe' flag
    await getAuth().setPersistence(
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );

    // Sign in with the email and password
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    // Retrieve the current user
    const currentUser = userCredential.user;
    await logger("LOGIN")
    // Update the authentication state
    return { status: "success", currentUser };
    } 
    catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          return { status: "error", message: "User not found" };
        case "auth/wrong-password":
          return { status: "error", message: "Incorrect password" };
        case "auth/invalid-credential":
          return { status: "error", message: "Invalid credentials. Try again" };
        case "auth/too-many-requests":
          return {
            status: "error",
            message:
              "Too many login attempts. Please try again later or reset your password.",
          };
        default:
          return { status: "error", message: "An unexpected error occurred" };
      }
  }
};

// Function to login with email link
const loginWithEmailLink = async (email) => {
  try {
    await signInWithEmailLink(auth, email);
    // Set authentication status in local storage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", auth.currentUser.uid);
    await syncUserData();
  } catch (error) {
    console.error(error);
  }
};

// Function to send password reset email
const SendPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  } catch (error) {
    console.error(error);
  }
};

// Function to logout the current user
const logout = async () => {
  const logResult = await logger("LOGOUT")
  if(!logResult)
  return { success: false, message: 'An unexpected error occurred. Please try again later.' };
  signOut(auth);
};

// Function to reset the password
const resetPassword = async (email) => {
  try {
    const result = await sendPasswordResetEmail(auth, email);
    return {status: "success"};
  } catch (error) {
    return {status: 'error', message: error.message};
  }
}

// Function to delete user account.
const deleteAccount = async (password=null) => {
  try {
    /*
    Deleting account requires recent authentication. So force reauthentication.
    */
    const user = await getCurrentUserInfo();
    const uid = user.uid;

    if(user.authProvider === 'google')
    await reauthenticateWithPopup(auth.currentUser,googleAuthProvider)

    else if(user.authProvider === 'local')
    {
      const credential = EmailAuthProvider.credential(user.email,password)
      await reauthenticateWithCredential(auth.currentUser,credential)
    }

    // Delete the user document from Firestore
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await deleteDoc(userDoc.ref);
    }

    // Delete the user from Firebase Auth
    await deleteUser(auth.currentUser);

    return { status: 'success', message: 'User account deleted successfully' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

// Function to get current user in a systematic promise format. 
function getCurrentUser() {
  // Got this code from an old Firebase Repo, Issues section
  // No idea how it works but it works. 
  // Built in method of auth.currentUser is not reliable.
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject,
      // This line is added to handle the case where there is no change in the authentication state
      () => {
        unsubscribe();
        resolve(null); // Resolve with null to indicate no user is signed in
      }
    );
  });
}

// Function to create logs on the database relating to events such login and signup
const logger = async (event) => {
  try {
    const response = await fetch('https://ip-world.vercel.app/');
    const logData = await response.json();

    const userData = await getCurrentUserInfo()

    // Prepare the data
    const logEntry = {
      EVENT: event,
      TIMESTAMP: logData.USER_INFORMATION.TIMESTAMP,
      ASN_INFORMATION: logData.ASN_INFORMATION,
      GEO_INFORMATION: logData.GEO_INFORMATION,
      USER_INFORMATION: {...logData.USER_INFORMATION,"USER_ID":userData.uid,"PROFILE_NAME":userData.displayName}
    };

    // Push to Firebase
    await addDoc(collection(firestore, "logs"), logEntry);
    return true
  } catch (e) {
    return false
  }
}

export {
  auth,
  firestore,
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  loginWithEmailAndPassword,
  loginWithEmailLink,
  logout,
  SendPasswordResetEmail,
  setPersistence,
  getCurrentUser,
  addAuthChangeListener,
  resetPassword,
  deleteAccount,
  logger
};
