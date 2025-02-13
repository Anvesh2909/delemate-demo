import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC0AJflLXVz_8lpgh-lPhweYrEp-aCrzd0",
	authDomain: "delemate-96cce.firebaseapp.com",
	projectId: "delemate-96cce",
	storageBucket: "delemate-96cce.appspot.com",
	messagingSenderId: "467961266811",
	appId: "1:467961266811:web:d12e3727e28273dfaa98de",
	measurementId: "G-MQLZCZDWJX"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
