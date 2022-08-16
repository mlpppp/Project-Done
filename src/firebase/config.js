// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import "firebase/firestore" 
import "firebase/auth"
import "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk6Uhi6OZ57Nd7z-pK1ubHglmOh69uXWQ",
  authDomain: "project-management-b274f.firebaseapp.com",
  projectId: "project-management-b274f",
  storageBucket: "project-management-b274f.appspot.com",
  messagingSenderId: "783942725487",
  appId: "1:783942725487:web:4d1e27d342931e786b429a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Init Service
const projectFirestore = firebase.firestore()
const projectAuth =  firebase.auth()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.Timestamp 
export {projectFirestore, projectAuth, projectStorage, timestamp}