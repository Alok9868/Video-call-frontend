import React, { useState } from 'react';
import './endpage.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';


const Endpage = () => {

    let navigate = useNavigate();
    function end() {
        navigate("/");
    }

    return (
        <>
            <div className="end-main-div my-flex">
                <img src={logo} alt="" className="logo-end-page" />
                <h1>You have ended the meeting for everyone</h1>
                <button
                    className="return-home-btn my-flex"
                    onClick={end}
                >Return to Home Screen</button>
                <br />
                <div className="feedback">Submit Feedback</div>
            </div>
        </>
    );
}


export default Endpage;