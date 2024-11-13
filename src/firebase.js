import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAe94O5eReIy6hwpdff230Y-DCW-imR_0",
  authDomain: "dayvisit-59b4f.firebaseapp.com",
  projectId: "dayvisit-59b4f",
  storageBucket: "dayvisit-59b4f.appspot.com",
  messagingSenderId: "724369096524",
  appId: "1:724369096524:web:f196b354f3690ce15599e9"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
