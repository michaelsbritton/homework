import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Media from 'react-media';

import {ReactComponent as MyLogo} from '../../assets/logos/logoMB.svg';

import './Header.css';

const Header = () => {

    const auth = getAuth();

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const updateUserEmail = user.email
              console.log(user)
              setLoggedIn(true)
            } else {
              // User is signed out
              // ...
              setLoggedIn(false)
            }
          });
    }, [loggedIn])

  

    // const [matsuOn, setMatsuOn] = useState(false);
    const [matsuStayOn, setMatsuStayOn] = useState(false);
    // const [motoOn, setMotoOn] = useState(false);
    const [motoStayOn, setMotoStayOn] = useState(false);

    // const handleMatsuMouseEnter = () => {
    //     setMatsuOn(true);
    // };
    // const handleMotoMouseEnter = () => {
    //     setMotoOn(true);
    // };
    // const handleMatsuMouseLeave = () => {
    //     setMatsuOn(false);
    //     setMatsuClickCount(0);
    // };
    // const handleMotoMouseLeave = () => {
    //     setMotoOn(false);
    //     setMotoClickCount(0);
    // };
    const handleMatsuClick = () => {
        let updateMatsuStayOn = !matsuStayOn;
        setMatsuStayOn(updateMatsuStayOn);
    };
    const handleMotoClick = () => {
        let updateMotoStayOn = !motoStayOn;
        setMotoStayOn(updateMotoStayOn);
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("Signed Out!")
          }).catch((error) => {
            console.log("Error!")
          });
    };

    return(
        <div className="HeaderContainer">
            <Media query="(min-width: 768px)">
                <div className="Logo" onClick={handleMatsuClick}>
                    <div className="LogoText">
                        <span className={matsuStayOn ? "LogoMatsuOn" : "LogoMatsu"}>松</span>
                    </div>
                    <MyLogo 
                        className="LogoImg" 
                        height='15vh'
                        width='100%' 
                    />
                </div>
            </Media>
            <div className="HeaderLinks">
                <nav>
                    <ul>
                        <li>
                        <Link to="/Home">Home</Link>
                        </li>
                        <li>
                        <Link to="/HW">Homework</Link>
                        </li>
                        <li>
                        <Link to="/BookReports">Book Reports</Link>
                        </li>
                        <li>
                        {loggedIn ? <Link to="/Teacher">Teacher Home</Link> :  <Link to="/TeacherLogin">Teacher Login</Link>}
                        </li>
                        {loggedIn ? <li><Link to="/Home" onClick={handleLogout}>Logout</Link></li> : null }
                    </ul>
                </nav>
            </div>
            <Media query="(min-width: 768px)">
                <div className="Logo" onClick={handleMotoClick} >
                    <div className="LogoText">
                        <span className={motoStayOn ? "LogoMotoOn" : "LogoMoto"}>本</span>
                    </div>
                    <MyLogo 
                        className="LogoImg" 
                        height='15vh'
                        width='100%' 
                    />
                </div>
            </Media>
        </div>
    )
}

export default Header;