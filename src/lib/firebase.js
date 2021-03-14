// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: 'AIzaSyDptx_fw3yF8lWAPyJSYuX4a5HZeokJjAM',
  authDomain: 'smart-shopper-e95d9.firebaseapp.com',
  projectId: 'smart-shopper-e95d9',
  storageBucket: 'smart-shopper-e95d9.appspot.com',
  messagingSenderId: '817342068797',
  appId: '1:817342068797:web:6437e4b48a58fcec9b1254',
};

let fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();

export { fb, db };
