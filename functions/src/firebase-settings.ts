import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3O0v433uF3W6toU7iqS5lUUYSm4A-pZQ",
  authDomain: "gasplantadmin.firebaseapp.com",
  projectId: "gasplantadmin",
  storageBucket: "gasplantadmin.appspot.com",
  messagingSenderId: "1060225921487",
  appId: "1:1060225921487:web:d9c330e9f75d80ca8922ba",
  measurementId: "G-00CX41ZDNY"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }