import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBXBZ-bbaODeVd3jrGXj0_ndD2xrW5eXkU",
  authDomain: "suankularb-exhibitions.firebaseapp.com",
  databaseURL: "https://suankularb-exhibitions.firebaseio.com",
  projectId: "suankularb-exhibitions",
  storageBucket: "suankularb-exhibitions.appspot.com",
  messagingSenderId: "565075076599",
  appId: "1:565075076599:web:625fc08ce7d970be993af2",
  measurementId: "G-EMLXSHPE0M"
})

export const auth = app.auth()
export default app