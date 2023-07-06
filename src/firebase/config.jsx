// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXfwRCGDlyzkOaNO7j37KPY0rgO9v6TCg",
  authDomain: "printxpress-1652c.firebaseapp.com",
  projectId: "printxpress-1652c",
  storageBucket: "printxpress-1652c.appspot.com",
  messagingSenderId: "580674339745",
  appId: "1:580674339745:web:67af9f496ce659e01581e0",
  measurementId: "G-30VQ2JL8LM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
