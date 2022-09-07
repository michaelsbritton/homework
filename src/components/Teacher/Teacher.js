import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getDatabase } from "firebase/database";

import './Teacher.css';

import TeacherTest from './TeacherTest/TeacherTest';
import TeacherBookReports from './TeacherBookReports/TeacherBookReports';
import TeacherHomework from './TeacherHomework/TeacherHomework';

const Teacher = () => {

    let db = getDatabase();
    const auth = getAuth();

    const [userEmail, setUserEmail] = useState("");
    const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //   const uid = user.uid;
                const updateUserEmail = user.email
                //   console.log(user)
              setUserEmail(updateUserEmail)
              setUserStatus(true);
            } else {
              // User is signed out
              // ...
              setUserEmail("You aren't allowed in here")
            }
          });
    }, [auth, db])

    return(
        <div className="TeacherContainer">
            {userStatus ? 
                <>
                <div className="TeacherTitle">Teacher Console</div>
                <div className="TeacherNavigation">
                    <Tabs defaultActiveKey="home" id="teacher-navigation" className="mb-3" 
                    style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <Tab eventKey="home" title="Home">
                            <div className="TeacherMessage">
                                <span><b>Teacher Home</b></span>
                                <br />
                                <br />
                                <span>Welcome back, {userEmail} </span>
                            </div>
                        </Tab>
                        <Tab eventKey="homework" title="Homework">
                            <TeacherHomework />
                        </Tab>
                        <Tab eventKey="book-report" title="Book Reports">
                            <TeacherBookReports />
                        </Tab>
                        <Tab eventKey="test" title="Test">
                            <TeacherTest />
                        </Tab>
                    </Tabs>
                </div>
                </>
            : 
                <div style={{ margin: "25px 0px", fontSize: "1.33em" }}> 
                    You are not authorized to use this page. Please sign in and try again. 
                </div> 
            
            }
        </div>
    ) 
};

export default Teacher;