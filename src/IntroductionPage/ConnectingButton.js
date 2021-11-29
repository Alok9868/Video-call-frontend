

import React from 'react';
import Button from '@mui/material/Button';
import './ConnectingButton.css';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import KeyboardIcon from '@mui/icons-material/Keyboard';



export default function ConnectingButton({createRoomButton, buttonText ,onClickHandler}) {

    // const buttonClass = createRoomButton ? "create_room_button" : "join_room_button"
    // 
    return (
        <Button variant="contained" onClick={onClickHandler}   className="meet-buttons">
            {
                buttonText==="join a meeting"?<KeyboardIcon className="video-icon-plus" />:<VideoCallIcon className="video-icon-plus" />
            }
            {buttonText}
        </Button>
    )
}

