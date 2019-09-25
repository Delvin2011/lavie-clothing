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

  //required for google authentication

export const auth = firebase.auth(); //.auth() from import 'firebase/auth'
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //access to the class GoogleAuthProvider
provider.setCustomParameters({prompt: 'select_account'}); // we always want to trigger the Google popup whenever we use the GoogleAuthProvider for authentication & SignIn
export const signInWithGoogle = () => auth.signInWithPopup(provider); //trigger the popup only for signin with Google

//enable signIn with google on Firebase by clicking Develop>Authentication>Sign-in method>Google
export default firebase;