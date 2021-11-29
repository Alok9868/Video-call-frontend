import React, { useState } from 'react'
import ConnectingButton from './ConnectingButton'
import cookie from 'react-cookies';
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from '../modal/Modal'

export default function ConnectingButtons() {


    const [showModal, setShowModal] = useState(false);

    const userid = cookie.load('userid');
    let navigate = useNavigate();
    function deactive() {
        setShowModal(false);
    }

    const pushToJoinRoomPage = () => {

        if (userid) {
            navigate('/join-room');
        }
        else {
            setShowModal(true)
        }

    }
    const pushToJoinRoomPageAsHost = () => {
        if (userid) {
            navigate("/join-room?host=true");
        }
        else {
            setShowModal(true)
        }
    }
    return (
        <div className="connecting_buttons_container">
            <ConnectingButton buttonText="join a meeting" onClickHandler={pushToJoinRoomPage} />
            <ConnectingButton createRoomButton buttonText="host a meeting" onClickHandler={pushToJoinRoomPageAsHost} />
            <MyVerticallyCenteredModal
                show={showModal}
                onHide={deactive}
                content="please sign in first To Enter into Meeting Room"
            />
        </div>
    )
}
