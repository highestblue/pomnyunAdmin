import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCtWSaqIYTmDctlf5CAYOy5kfde9gQdvnU",
  authDomain: "pomnyun-efa5b.firebaseapp.com",
  databaseURL: "https://pomnyun-efa5b.firebaseio.com",
  storageBucket: "pomnyun-efa5b.appspot.com",
  messagingSenderId: "1036810895214"
};

const firebaseApp = Firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()
const storage = firebaseApp.storage().ref()
const auth = firebaseApp.auth()

export { auth, db, storage }
