import { browserLocalPersistence, browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
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
    getDocs
} from './firebase.js';

const auth = getAuth(app);
const firestore = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();


const addAuthChangeListener = (onChange) => {
    return onAuthStateChanged(auth, onChange);
};



// Function to register a new user with email and password
const registerWithEmailAndPassword = async (name,phoneNumber, email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const newUser = {
            authProvider: 'local',
            uid: user.uid,
            email: user.email,
            metadata: user.metadata ? JSON.stringify(user.metadata) : "",
            displayName: name,
            phoneNumber: user.phoneNumber ? user.phoneNumber : phoneNumber,
            photoUrl: user.photoURL ? user.photoURL : "",
            accountType: 'free',
            testsTaken: 0
        };
        const usersCollection = collection(firestore, "users");
        await addDoc(usersCollection, newUser);

    } catch (error) {
        console.error(error);
    }
};

// Function to sign in with Google using Google OAuth provider
const signInWithGoogle = async ({ rememberMe }) => {
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
            testsTaken: 0
        };
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(query(usersCollection, where("uid", "==", user.uid)));
        if (querySnapshot.empty) {
            await addDoc(usersCollection, newUser);
        }
        // Set authentication status in local storage
        /*if (rememberMe) {
            console.log("Local persistence");
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', user.uid);
            localStorage.setItem('userDetails',user)
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('currentUser');
        } else {
            console.log("Session persistence");
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('currentUser', user.uid);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('currentUser');
        }
        await syncUserData()*/
        return { success: true, user }; // Indicate successful login
    } catch (error) {
        console.error("Sign-in failed:", error);
        return { success: false, error }; // Indicate failed login with error details
    }
};


// Function to check if the user is signed in
const isSignedIn = () => {
    /*var isSignedInLocal = localStorage.getItem('isAuthenticated')  === 'true' ? true : false;
    if (isSignedInLocal) {
        return isSignedInLocal
    }

    // Check if the user ID exists in local storage
    var isSignedInSession = sessionStorage.getItem('isAuthenticated')  === 'true' ? true : false;
    if (isSignedInSession) {
        return isSignedInSession 
    }

    return false*/
}

// Function to login with email and password
const loginWithEmailAndPassword = async (email, password,{rememberMe}) => {
    try {
        setPersistence(auth,rememberMe?browserLocalPersistence:browserSessionPersistence).then(
            async ()=>{
                await signInWithEmailAndPassword(auth, email, password)
            }
        )

        // Set authentication status in local storage
       /*if(rememberMe)
        {

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser',auth.currentUser.uid);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('currentUser');
        }
        else
        {
    
        sessionStorage.setItem('isAuthenticated','true');
        sessionStorage.setItem('currentUser',auth.currentUser.uid);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        }
        await syncUserData()
        */
        
    } catch (error) {
        console.error(error);
        throw(error)
    }
};

// Function to login with email link
const loginWithEmailLink = async (email) => {
    try {
        await signInWithEmailLink(auth, email);
        // Set authentication status in local storage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser',auth.currentUser.uid);
        await syncUserData()
    } catch (error) {
        console.error(error);
    }
};

// Function to send password reset email
const SendPasswordResetEmail = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent');
    } catch (error) {
        console.error(error);
    }
};

// Function to logout the current user
const logout = () => {
    // Remove authentication status from local storage
    // localStorage.removeItem('isAuthenticated');
    // localStorage.removeItem('currentUser');
    // sessionStorage.removeItem('isAuthenticated');
    // sessionStorage.removeItem('currentUser');
    signOut(auth);
};

const getCurrentUser = () => {
    return auth.currentUser
}


const syncUserData = async () => {
    /*if(isSignedIn())
    {
    const usersCollection = collection(firestore, "users");
    const querySnapshot = await getDocs(query(usersCollection, where("uid", "==", getCurrentUser() )));
    sessionStorage.setItem("userDetails",JSON.stringify(querySnapshot.docs[0].data()))
    }
*/
}

export {
    auth,
    firestore,
    registerWithEmailAndPassword,
    signInWithGoogle,
    loginWithEmailAndPassword,
    loginWithEmailLink,
    logout,
    SendPasswordResetEmail,
    isSignedIn,
    setPersistence,
    getCurrentUser,
    addAuthChangeListener,
    syncUserData
};

