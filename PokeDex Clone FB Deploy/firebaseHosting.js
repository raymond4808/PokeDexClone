// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDZVoTce9DiRVeKcvjly3RrI4PLnvHfUpA",
  authDomain: "pokedex-clone-face0.firebaseapp.com",
  projectId: "pokedex-clone-face0",
  storageBucket: "pokedex-clone-face0.appspot.com",
  messagingSenderId: "34186985441",
  appId: "1:34186985441:web:2c0446f6795debe1e71ca0",
  measurementId: "G-9KVLVC9N32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);