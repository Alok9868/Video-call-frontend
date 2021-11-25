import React, { useState } from 'react'
import { auth, provider } from "./firebase";
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import Home from '../Home/Home';
import {setIdentity} from '../store/actions'
import store from '../store/store'
import { async } from '@firebase/util';
function Login() {
  const [userid, setuserid] = useState(cookie.load('userid'));
  async function signin() {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
        var token = result.user.uid;
        var name = result.user.displayName;
        var photoURL = result.user.photoURL;
        cookie.save("userid", token, { path: '/', expires, maxAge: 1000000 });
        cookie.save('displayName', name, { path: '/', expires, maxAge: 1000000 });
        cookie.save('photoURL', photoURL, { path: '/', expires, maxAge: 1000000 });
        // store.dispatch(setIdentity(name))
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