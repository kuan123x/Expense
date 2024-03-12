import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0aufq8GB4jagt7EpSwVb0OHJ0xNllD-o",
  authDomain: "expensetracker-4be99.firebaseapp.com",
  projectId: "expensetracker-4be99",
  storageBucket: "expensetracker-4be99.appspot.com",
  messagingSenderId: "644358019477",
  appId: "1:644358019477:web:bd859c837633cd681b3e9c"
};
  

initializeApp(firebaseConfig);

const db = getFirestore();
export default db