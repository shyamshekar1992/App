import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXtFQVA5Q7K3F_IeqFrR_-wDdqj4KsLFY",
  authDomain: "shyam-gmbh.firebaseapp.com",
  projectId: "shyam-gmbh",
  storageBucket: "shyam-gmbh.firebasestorage.app",
  messagingSenderId: "1096712939317",
  appId: "1:1096712939317:web:76f6238d5b6c418802ce7c",
  measurementId: "G-NVH7E83Z94"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
