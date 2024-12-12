// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCvNgKRssiyHjLtY0TevH6m6C67w412G8",
    authDomain: "ebus-management-e18ca.firebaseapp.com",
    databaseURL: "https://ebus-management-e18ca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ebus-management-e18ca",
    storageBucket: "ebus-management-e18ca.firebasestorage.app",
    messagingSenderId: "208778308024",
    appId: "1:208778308024:web:5f85137b75ad918e36c74d",
    measurementId: "G-RKBNFHTSCF"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
