import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA8zFWThmDFTpA0nMJWBUxqgZj3fqXvgzE",
  authDomain: "devchat-79ea1.firebaseapp.com",
  databaseURL: "https://devchat-79ea1.firebaseio.com",
  projectId: "devchat-79ea1",
  storageBucket: "devchat-79ea1.appspot.com",
  messagingSenderId: "789114389336",
  appId: "1:789114389336:web:4be1554e7394b6b4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;