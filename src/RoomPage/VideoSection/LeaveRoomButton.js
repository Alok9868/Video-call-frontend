import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LeaveRoomButton() {

    let navigate = useNavigate();
    const handleRoomDisconnection=() => {
        // const siteURL = window.location.origin;
        // window.location.href=siteURL;
        // navigate("/end");
    }
    return (
        <div className="video_button_container">
            <button className="video_button_end" onClick={handleRoomDisconnection}>
            <a href="http://localhost:3000/end" >Leave Room</a> 
            </button>
        </div>
    )
}
