import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDm_fYRIzy_xOso-mzyr7ZsZc8K7PvOBqg",
    authDomain: "react-gdocs.firebaseapp.com",
    projectId: "react-gdocs",
    storageBucket: "react-gdocs.appspot.com",
    messagingSenderId: "879882564701",
    appId: "1:879882564701:web:5d09e194c154626b5649b4"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };

