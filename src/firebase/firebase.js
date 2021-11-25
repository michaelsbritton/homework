import { initializeApp } from 'firebase/app';
// import database from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCfDRoOUjBhtcTwdLXCCsWu7T7Obahvly8",
    authDomain: "homework-d221e.firebaseapp.com",
    projectId: "homework-d221e",
    storageBucket: "homework-d221e.appspot.com",
    messagingSenderId: "508578415933",
    appId: "1:508578415933:web:99eb1232d4ac3f0de4f154",
    measurementId: "G-3QMBL9Y1NX",
    databaseURL: "https://homework-d221e-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;