import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyACcwLOqsQm8fwidm6iTAxPQPlKTQ21WUc",
  authDomain: "expnese-tracker.firebaseapp.com",
  projectId: "expnese-tracker",
  storageBucket: "expnese-tracker.appspot.com",
  messagingSenderId: "173139483344",
  appId: "1:173139483344:web:80bce7c71514737f661cd5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
 