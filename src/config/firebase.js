import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBhwbK9ucZmqiaX-um7thD0AThzLVfeE-c",
  authDomain: "fir-course-71fc9.firebaseapp.com",
  projectId: "fir-course-71fc9",
  storageBucket: "fir-course-71fc9.appspot.com",
  messagingSenderId: "73816009156",
  appId: "1:73816009156:web:9ede06234a780cae0cdc91",
  measurementId: "G-YYGXG721ZT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);