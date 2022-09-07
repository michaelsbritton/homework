import React from 'react';
import { HashRouter, BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import app, { auth } from './firebase/firebase';

// import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Homework from './components/Homework/Homework';
import BookReports from './components/BookReports/BookReports';
import TeacherLogin from './components/TeacherLogin/TeacherLogin';
import Teacher from './components/Teacher/Teacher';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Imports for Firebase
// import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

function App() {

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCfDRoOUjBhtcTwdLXCCsWu7T7Obahvly8",
  //   authDomain: "homework-d221e.firebaseapp.com",
  //   projectId: "homework-d221e",
  //   storageBucket: "homework-d221e.appspot.com",
  //   messagingSenderId: "508578415933",
  //   appId: "1:508578415933:web:99eb1232d4ac3f0de4f154",
  //   measurementId: "G-3QMBL9Y1NX",
  //   databaseURL: "https://homework-d221e-default-rtdb.asia-southeast1.firebasedatabase.app",
  // };

  
  // const app = initializeApp(firebaseConfig);
  // Get a reference to the database service
  const database = getDatabase(app);
  // Get the authorization tools?
  // const auth = app.auth;


  return (
    <div className="App">
      {/* <AuthProvider> */}
        <BrowserRouter>  
          <Header />
          <Routes>
            <Route path='/' element={<Navigate replace to='/Home' />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/HW' element={<Homework />} />
            <Route path='/BookReports'  element={<BookReports db={database} />} />
            <Route path='/Teacher' element={<Teacher />} />
            <Route path='/TeacherLogin' element={<TeacherLogin />} />
            
          </Routes>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </div>  
  );
}

export default App;

