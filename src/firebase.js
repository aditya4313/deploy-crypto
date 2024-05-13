import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getfirestore } from "firebase/firestore";
import firebaseConfig from "./config/firebase";

const firebaseapp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);

export { auth, db };
