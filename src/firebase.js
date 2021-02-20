import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBAfHePF2BJYYf6VtTscOmjsxWp1Q0w6kk",
  authDomain: "facebook-clone-1f1ee.firebaseapp.com",
  projectId: "facebook-clone-1f1ee",
  storageBucket: "facebook-clone-1f1ee.appspot.com",
  messagingSenderId: "961706865992",
  appId: "1:961706865992:web:765549dd362490ab90ef7d",
  measurementId: "G-QXQ8JGH2SD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
