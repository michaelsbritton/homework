import React, { useState, useEffect, useContext } from 'react';
// import { getAuth } from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
};

export function AuthProvider({ children }) {
    
    const auth = getAuth();
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser, 
        signup
    }

    return(
        <AuthProvider.Context value={value}>
            {children}
        </AuthProvider.Context>
    )


}