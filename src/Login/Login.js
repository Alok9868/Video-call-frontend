import React, { useState } from 'react'
import { auth, provider } from "./firebase";
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { signInWithPopup } from "firebase/auth";
import Home from '../Home/Home'
function Login() {
  const [userid, setuserid] = useState(cookie.load('userid'));
  function signin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        var token = result.user.uid;
        var name = result.user.displayName;
        var photoURL = result.user.photoURL;
        cookie.save("userid", token, { path: '/', expires, maxAge: 1000000 });
        cookie.save('displayName', name, { path: '/', expires, maxAge: 1000000 });
        cookie.save('photoURL', photoURL, { path: '/', expires, maxAge: 1000000 });
        setuserid(result.user.uid);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log('====================================');
        console.log('error in authenticating', error);
        console.log('====================================');
        // ...
      });
  }

  return userid ? <Navigate to="/Home" />
    :
    <Home 
    signin={signin}
    />
       
}

export default Login