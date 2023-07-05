import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyABgnyKTJ4LmiLoaMBNnwTacvMGMVbamZ8",
  authDomain: "oolook-ddb73.firebaseapp.com",
  projectId: "oolook-ddb73",
  storageBucket: "oolook-ddb73.appspot.com",
  messagingSenderId: "440588185571",
  appId: "1:440588185571:web:116d17b3d7153bff377ad6"
};

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db