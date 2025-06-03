import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjbvxZywuFFDBTtJwt11kEC7cGQ3tV1QI",
  authDomain: "notion-project-21956.firebaseapp.com",
  projectId: "notion-project-21956",
  storageBucket: "notion-project-21956.firebasestorage.app",
  messagingSenderId: "824972618605",
  appId: "1:824972618605:web:ea39009bdbcb228d890864"
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db }