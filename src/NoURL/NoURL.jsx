import React from 'react';
import './NoURL.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';


const NoURL = () => {

    let navigate = useNavigate();
    function end() {
        navigate("/");
    }

    return (
        <>
            <div className="end-main-div my-flex">
                <img src={logo} alt="" className="logo-end-page" />
                <h1>NO SUCH URL EXISTS</h1>
                <button
                    className="return-home-btn my-flex"
                    onClick={end}
                >Return to Home Screen</button>
            </div>
        </>
    );
}


export default NoURL;