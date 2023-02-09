import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pricebook-485ec.firebaseapp.com",
  projectId: "pricebook-485ec",
  storageBucket: "pricebook-485ec.appspot.com",
  messagingSenderId: "411158141572",
  appId: "1:411158141572:web:60285de64a827ad3de00d1",
  measurementId: "G-TV7TPMG4TQ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
