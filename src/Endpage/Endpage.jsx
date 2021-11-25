import React from 'react';
import './endpage.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


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
                <Button variant="contained" onClick={end}className="return-home-btn">Return to Home Screen</Button>
                {/* <button
                    className="return-home-btn my-flex"
                    onClick={end}
                >Return to Home Screen</button> */}
            </div>
        </>
    );
}


export default Endpage;