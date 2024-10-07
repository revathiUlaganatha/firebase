// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu5tRF2ECP6M4SMLSdlKgsztqtm7Kb0lo",
  authDomain: "react-student-curd-cf42d.firebaseapp.com",
  projectId: "react-student-curd-cf42d",
  storageBucket: "react-student-curd-cf42d.appspot.com",
  messagingSenderId: "360648515718",
  appId: "1:360648515718:web:739c676a9382195254b107"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);


export default App;


const db = getFirestore()

export {
  db
}