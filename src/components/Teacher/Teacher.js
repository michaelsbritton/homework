import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './Teacher.css';

import TeacherTest from './TeacherTest/TeacherTest';
import TeacherBookReports from './TeacherBookReports/TeacherBookReports';

const Teacher = () => {

    const auth = getAuth();
    const history = useHistory();

    const [userEmail, setUserEmail] = useState("");
    const [activeButton, setActiveButton] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const updateUserEmail = user.email
              console.log(user)
              setUserEmail(updateUserEmail)
            } else {
              // User is signed out
              // ...
              setUserEmail("You aren't allowed in here")
            }
          });
    }, [activeButton])

    const handleClickTeacherHome = () => {
        setActiveButton("home")
        console.log("ClickyClickBitch")
    };

    const handleClickTeacherBookReport = () => {
        setActiveButton("book_report")
    };

    const handleClickTeacherTest = () => {
        setActiveButton("test")
    };  

    return(
        <div className="TeacherContainer">
            <div className="TeacherTitle">Teacher Console</div>
            <div className="TeacherMessage">Welcome back, {userEmail} </div>
            <div className="TeacherNavigation">
                <Button onClick={handleClickTeacherHome} className="mx-4">Teacher Home</Button>
                <Button onClick={handleClickTeacherBookReport} className="mx-4">Teacher Book Reports</Button>
                <Button onClick={handleClickTeacherTest} className="mx-4">Teacher Test</Button>
            </div>
            {(activeButton === "book_report") ? <TeacherBookReports />
                : (activeButton === "test") ? <TeacherTest /> 
                : (activeButton === "home") ? <span></span>
                : null }
        </div>
    ) 
};

export default Teacher;