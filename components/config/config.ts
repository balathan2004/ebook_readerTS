import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaAtESAWssWPTv9dMXKSvWjz-4WfZUbJg",

  authDomain: "e-book-61c4f.firebaseapp.com",

  projectId: "e-book-61c4f",

  storageBucket: "e-book-61c4f.appspot.com",

  messagingSenderId: "345891582572",

  appId: "1:345891582572:web:df3fdcc1f3802c37749e49",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig, "nextjs-read");
const firestore = getFirestore(firebase);
const storage = getStorage(firebase);

export { firebase, firestore, storage };
