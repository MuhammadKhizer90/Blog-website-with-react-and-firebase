// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB7nXV_EedXQkA-VAo6b_Nkoi13TMTGF8Y",
    authDomain: "crud-b4934.firebaseapp.com",
    projectId: "crud-b4934",
    storageBucket: "crud-b4934.appspot.com",
    messagingSenderId: "779958676599",
    appId: "1:779958676599:web:fdcd2da166e45412f9ea72",
    measurementId: "G-P16J1CZD4W"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const storage = getStorage(app)
export const db = getFirestore(app)


