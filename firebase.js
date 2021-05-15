import firebase from "firebase";

import { config } from "./firebaseConfig";

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

// checks if there is already a app present
// if present use that else create one.

const db = app.firestore(); // access to database
const auth = app.auth(); // access to auth
const provider = new firebase.auth.GoogleAuthProvider(); // access to provider

export { auth, db, provider, app }; // exporting to use it in the app
