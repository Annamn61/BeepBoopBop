import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

  const firebaseConfig = {
    apiKey: "AIzaSyApLZqqKvPiH6Wsb7Bw7MLLBhAY6cM9QUE",
    authDomain: "oregano-e2f9a.firebaseapp.com",
    projectId: "oregano-e2f9a",
    // databaseURL: "https://nutrition-app-44b06-default-rtdb.firebaseio.com",
    storageBucket: "oregano-e2f9a.firebasestorage.app",
    messagingSenderId: "933042277427",
    appId: "1:933042277427:web:411a5233d90f4021d1a746",
    measurementId: "G-0K90E47D14"
  };
  
  export const firebaseApp = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(firebaseApp);
