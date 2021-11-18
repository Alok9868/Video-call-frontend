import React from 'react'
import ConnectingButton from './ConnectingButton'

import { useNavigate } from "react-router-dom";
export default function ConnectingButtons() {
   
    let navigate = useNavigate();
    const pushToJoinRoomPage =()=>{

        navigate('/join-room');
    }
    const pushToJoinRoomPageAsHost =()=>{

        navigate("/join-room?host=true")
    }
    return (
        <div className="connecting_buttons_container">
            <ConnectingButton buttonText="join a meeting" onClickHandler={pushToJoinRoomPage} />
            <ConnectingButton createRoomButton buttonText="host a meeting" onClickHandler={pushToJoinRoomPageAsHost} />
        </div>
    )
}
