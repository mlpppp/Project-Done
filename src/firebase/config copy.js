// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import "firebase/firestore" 
import "firebase/auth"
import "firebase/storage"

// Your web app's Firebase configuration


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Init Service
const projectFirestore = firebase.firestore()
const projectAuth =  firebase.auth()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.Timestamp 
export {projectFirestore, projectAuth, projectStorage, timestamp}