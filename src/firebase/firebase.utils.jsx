import firebase from 'firebase/app'; //firebase keyword is going to give us access to the below
import 'firebase/firestore'; //import dependances for the database
import 'firebase/auth'; //import dependances for the authentification

const config = {
    apiKey: "AIzaSyCplMBR0PDYnSYWkQMJQwnVITsBbajyk-A",
    authDomain: "lavie-db.firebaseapp.com",
    databaseURL: "https://lavie-db.firebaseio.com",
    projectId: "lavie-db",
    storageBucket: "",
    messagingSenderId: "792040743338",
    appId: "1:792040743338:web:336ca3f57c94719b7c4bd3"
  };

firebase.initializeApp(config); //firebase initialisation

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); //string interpolation. Checking if the user object from the authentication, exists in the database.
  //uid is the dynamically generated ID string that google made when authentication the user using google signIN
  //use the snapSHot to check if or if not data exist
  const snapShot = await userRef.get();

  //the 'exists' on the snapShot tells us if their is any user data.
  // if no data, create data using the user.Auth object (take from the object what we need to stroe in the database) and put in users collection.
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date(); //the time when the is created.

    //asynchronous request to the database to store the data.
    //if user does not exist, set user
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch (error){
  console.log('error creating user', error.message)
    }
  }

  console.log(snapShot);
  return userRef;
}

  //required for google authentication

export const auth = firebase.auth(); //.auth() from import 'firebase/auth'
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //access to the class GoogleAuthProvider
provider.setCustomParameters({prompt: 'select_account'}); // we always want to trigger the Google popup whenever we use the GoogleAuthProvider for authentication & SignIn
export const signInWithGoogle = () => auth.signInWithPopup(provider); //trigger the popup only for signin with Google

//enable signIn with google on Firebase by clicking Develop>Authentication>Sign-in method>Google
export default firebase;