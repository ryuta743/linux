import firebase from 'firebase'
import 'firebase/storage'
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAERAskRHfHkwaGsj4nZA93ZzemSdhYb1A",
        authDomain: "tenshoku-9b0c8.firebaseapp.com",
        databaseURL: "https://tenshoku-9b0c8.firebaseio.com",
        projectId: "tenshoku-9b0c8",
        storageBucket: "tenshoku-9b0c8.appspot.com",
        messagingSenderId: "645330231673"
    })
}

export default firebase