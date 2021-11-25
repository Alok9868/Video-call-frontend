import React from 'react'
import { useNavigate } from 'react-router-dom';
import url from '../../baseurl';

export default function LeaveRoomButton() {

    // let navigate = useNavigate();
    // const handleRoomDisconnection=() => {
    //     const siteURL = window.location.origin;
    //     window.location.href=siteURL;
    //     navigate("/end");
    // }
    return (
        <div className="video_button_container">
            <a className="video_button_end" href={url+"end"} >Leave Room</a>       
        </div>
    )
}
