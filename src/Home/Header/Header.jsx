import React, { useState } from 'react';
import './header.css';
import Avatar from '@mui/material/Avatar';
import logo from './logo.png';
import cookie from 'react-cookies';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = ({ signin }) => {
    var weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day = weeks[new Date().getDay()];
    var month = months[new Date().getMonth()];
    var year = new Date().getFullYear();
    var date = new Date().getDate();
    var d = day + ", " + date + " " + month + " " + year;
    const name = cookie.load('displayName');
    const photoURL = cookie.load('photoURL');
    let navigate = useNavigate();

    function signout() {
        console.log('signout');
        cookie.remove("userid", { path: "/" });
        cookie.remove("displayName", { path: "/" });
        cookie.remove('photoURL', { path: "/" });
        navigate("/");
        // window.location.reload();
    }
    return (

        // <>
        //     
        //         <img src={logo} alt="" className="logo" />
        //        { name ? <h3>Welcome {name}</h3> : " "}
        //        <h3>{d}</h3>
        //         { photoURL ? <Avatar alt="Travis Howard" src={photoURL} className="user-avatar" /> :<Avatar alt="Travis Howard" src="https://avatars.dicebear.com/api/male/123.svg" className="user-avatar" />}
        //         { name ? <button onClick={signout}>Sign out</button> : <button onClick={signin}>Sign in</button>}
        //     </div>
        // </>
        // <div className="header my-h-flex">
        //     <h3 className="user-name-date">{d}<br />{name ? <p className="user-name-date">Welcome {name}</p> : " "}</h3>
        //     <div className="user-auth-box">
        //         {photoURL ? <Avatar alt="Travis Howard" src={photoURL} className="user-avatar" /> : <Avatar src="/broken-image.jpg" className="user-avatar" />}
        //         {name ? <Button size="small" onClick={signout} className="auth-btn">Sign out</Button> : <Button size="small" onClick={signin} className="auth-btn">Sign in</Button>}
        //     </div>
        // </div>
        <>
        <div className="header my-h-flex">
            <img src={logo} alt="" className="logo" />
           <h3 className="user-name-date">{d}<br />{name ? <p className="user-name-date">Welcome {name}</p> : " "}</h3>
            <div className="user-auth-box">
                {photoURL ? <Avatar alt="Travis Howard" src={photoURL} className="user-avatar" /> : <Avatar src="/broken-image.jpg" className="user-avatar" />}
                {name ? <Button size="small" onClick={signout} className="auth-btn">Sign out</Button> : <Button size="small" onClick={signin} className="auth-btn">Sign in</Button>}
            </div>
        </div>
    </>




    );
}


export default Header;