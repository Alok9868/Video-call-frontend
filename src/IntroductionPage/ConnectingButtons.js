import React from 'react'
import ConnectingButton from './ConnectingButton'
import cookie from 'react-cookies';
import { useNavigate } from "react-router-dom";
export default function ConnectingButtons() {

    const userid = cookie.load('userid');
    let navigate = useNavigate();
    
    const pushToJoinRoomPage = () => {

        if (userid) {
            navigate('/join-room');
        }
        else {
            window.alert('Please sign in first');
            // navigate('/');
        }

    }
    const pushToJoinRoomPageAsHost = () => {
        if (userid) {
            navigate("/join-room?host=true");
        }
        else {
            window.alert('Please sign in first');
            // navigate('/');
        }


        // navigate("/join-room?host=true")
    }
    return (
        <div className="connecting_buttons_container">
            <ConnectingButton buttonText="join a meeting" onClickHandler={pushToJoinRoomPage} />
            <ConnectingButton createRoomButton buttonText="host a meeting" onClickHandler={pushToJoinRoomPageAsHost} />
        </div>
    )
}
