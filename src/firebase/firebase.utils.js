import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB2qbCUfUbgbJRoW9ekKFXT8jz_ApPrfgo",
  authDomain: "e-commerce-db-4f61d.firebaseapp.com",
  databaseURL: "https://e-commerce-db-4f61d.firebaseio.com",
  projectId: "e-commerce-db-4f61d",
  storageBucket: "e-commerce-db-4f61d.appspot.com",
  messagingSenderId: "94819213090",
  appId: "1:94819213090:web:7d32f6736db0df58628f7b"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating userasdasdas', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
