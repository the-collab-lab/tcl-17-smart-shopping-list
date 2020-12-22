// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: "AIzaSyCJm5g2o5BWepS8NaomcE95w3r1isLuUyU",
  authDomain: "tcl-17-shopping-list.firebaseapp.com",
  projectId: "tcl-17-shopping-list",
  storageBucket: "tcl-17-shopping-list.appspot.com",
  messagingSenderId: "221649145784",
  appId: "1:221649145784:web:d7b96955cec8dba51e894d"
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
