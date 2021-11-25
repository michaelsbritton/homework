import React, {  } from 'react';
// import { Form, Button, Card } from 'react-bootstrap';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from 'firebase/database';


// import SignUp from '../../components/SignUp/SignUp';
import Login from '../../components/Login/Login';

import './TeacherLogin.css';

const TeacherLogin = () => {

    const auth = getAuth();
    const db = getDatabase();

    // const [user, setUser] = useState(null);
    // const [pageUser, setPageUser] = useState("");

    // const drillUser = (v) => {
    //     setUser(v);
    // }

    const something = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log("user: " + uid)
              console.log(user)
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }

    return(
        <div className="TeacherLoginContainer">
            <Login />
        </div>
    )
};

export default TeacherLogin;