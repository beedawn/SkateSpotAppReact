import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_SENDER_ID, REACT_APP_APP_ID, REACT_APP_MEASUREMENT_ID } from "react-native-dotenv";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
// signInWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
//   //Signed in...
//   const user= userCredential.user;
// })
// .catch ((error)=>{
//   const errorCode = error.code;
//   const errorMessage= error.message;
// });

export const firebaseObject = firebaseConfig;

export const db = getFirestore();