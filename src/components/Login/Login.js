import React, { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
// import { useAuth } from '../../contexts/AuthContext';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import './Login.css';

const Login = (props) => {

    const auth = getAuth();

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit")
        
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Logged In: " + user)
            console.log(Object.keys(user))
            history.push('/Teacher');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
        });
    }
    

    return(
        <div className="LoginContainer">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button type="submit" className="w-100 mt-4">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? Sign up
            </div>
        </div>
    )
};

export default Login;