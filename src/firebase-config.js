import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2FyCQQYE4EUjjzkWlNcxj9MVJMZ0SUM0",
    authDomain: "chatgpt-chatbot-4db33.firebaseapp.com",
    projectId: "chatgpt-chatbot-4db33",
    storageBucket: "chatgpt-chatbot-4db33.appspot.com",
    messagingSenderId: "556656028253",
    appId: "1:556656028253:web:e93fabf0084c045ca2bbb4"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);