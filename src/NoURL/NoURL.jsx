import React from 'react';
import './NoURL.css';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


const NoURL = () => {

    let navigate = useNavigate();
    function end() {
        navigate("/");
    }

    return (
        <>
            <div className="end-main-div my-flex">
                <img src={logo} alt="" className="logo-end-page" />
                <h2>NO SUCH URL EXISTS</h2>
                {/* <button
                    className="return-home-btn my-flex"
                    onClick={end}
                >Return to Home Screen</button> */}
                <Button variant="contained" className="return-home-btn my-flex"
                    onClick={end}>Return to Home Screen</Button>
            </div>
        </>
    );
}


export default NoURL;