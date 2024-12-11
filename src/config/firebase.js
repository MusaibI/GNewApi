import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpdVlxrm0ESFL5WJfex5QfOMAmAs4-Nbw",
    authDomain: "newapp-485d3.firebaseapp.com",
    projectId: "newapp-485d3",
    storageBucket: "newapp-485d3.firebasestorage.app",
    messagingSenderId: "514028543973",
    appId: "1:514028543973:web:20881f6a0180e7c6f0190c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
