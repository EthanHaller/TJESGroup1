
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhDFcNTl1vIfS5IY7fie-KEJv28d7IEKs",
  authDomain: "team1tjes.firebaseapp.com",
  projectId: "team1tjes",
  storageBucket: "team1tjes.appspot.com",
  messagingSenderId: "975825422274",
  appId: "1:975825422274:web:8aacc0369b2354e550785b"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
export {db};