import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-dhnHZTVHJTHQZ5FygZr30Q9TC-BOPII",
  authDomain: "saltand-glitz.firebaseapp.com",
  projectId: "saltand-glitz",
  storageBucket: "saltand-glitz.appspot.com",
  messagingSenderId: "710485598853",
  appId: "1:710485598853:web:e4bb604707dd23b5baffec",
  measurementId: "G-72DTNL9GP6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;