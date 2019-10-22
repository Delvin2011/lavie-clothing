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
  
  const collectionRef = firestore.collection('users'); //query collection of users in firebase
  const collectionSnapshot = await collectionRef.get(); //docs, empty, size. - gives us an array of docs inside of the collection.
  console.log({collection: collectionSnapshot.docs.map(doc => doc.data())});
  
  
  
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();//we want to get the doc at an empty string. Asking firebase to give a new doc ref and randomly generete an ID
    batch.set(newDocRef, obj)
  });
return await batch.commit(); //will fire off the batch request and returns a promise

  //console.log(collectionRef); //firestore will always return a ref and when commit succeeds it will come back and resolve a void value/null
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()), //javascript - pass it any string and it will return any characters URL can't handle/process e.g symbol 
      id: doc.id,
      title,
      items
    }
  });

  //the initla object goew into the 1st new collection, and sets the 1st value equal to the title but in lowe case e.g hats
  // returns hats and goes intno the 2nd object.
  //until we have an object where the titles of all the 5 collection objects are the keys and they equal their respective objects
  return transformedCollection.reduce((accumulator,collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
  
  //console.log(transformedCollection);
}

  //required for google authentication

export const auth = firebase.auth(); //.auth() from import 'firebase/auth'
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //access to the class GoogleAuthProvider
provider.setCustomParameters({prompt: 'select_account'}); // we always want to trigger the Google popup whenever we use the GoogleAuthProvider for authentication & SignIn
export const signInWithGoogle = () => auth.signInWithPopup(provider); //trigger the popup only for signin with Google

//enable signIn with google on Firebase by clicking Develop>Authentication>Sign-in method>Google
export default firebase;