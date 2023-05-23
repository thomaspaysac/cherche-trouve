import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6uwHee4t1OGIZVsexOMFvp1jUO9oUOp4",
  authDomain: "seekers-93aa1.firebaseapp.com",
  projectId: "seekers-93aa1",
  storageBucket: "seekers-93aa1.appspot.com",
  messagingSenderId: "360908746358",
  appId: "1:360908746358:web:c7692a5389814a2037f957"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }