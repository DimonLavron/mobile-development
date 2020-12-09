import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDpF1PW-Fktx4hKs4-pYPkq5_zRfJsyp1Q",
    authDomain: "mobile-app-9c27a.firebaseapp.com",
    projectId: "mobile-app-9c27a",
    storageBucket: "mobile-app-9c27a.appspot.com",
    messagingSenderId: "656949809642",
    appId: "1:656949809642:web:3fb586d7e7d5651ff06293"
};

firebase.initializeApp(firebaseConfig);

export default firebase;