import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDhXkcry3GmMCG2f4SnIHlEzGZ4FahyPOo",
	authDomain: "meihem-app.firebaseapp.com",
	projectId: "meihem-app",
	storageBucket: "meihem-app.appspot.com",
	messagingSenderId: "529881811758",
	appId: "1:529881811758:web:cc4aef8436712986f9c8bf",
	measurementId: "G-B5WR3E9JK4",
};

let app: FirebaseApp;
let storage: FirebaseStorage;
//let analytics;

// Initialize Firebase
if (firebase.apps.length === 0) {
	app = initializeApp(firebaseConfig);
	storage = getStorage(app);
	//analytics = getAnalytics(app);
} else {
	app = firebase.app();
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, storage };
