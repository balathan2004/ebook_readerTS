import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
apiKey: process.env.apiKey,

authDomain: process.env.authDomain,

projectId: process.env.projectId,

storageBucket: process.env.storageBucket,

messagingSenderId: process.env.messagingSenderId,

appId: process.env.appId,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig, "nextjs-read");
const firestore = getFirestore(firebase);
const storage = getStorage(firebase);

export { firebase, firestore, storage };
