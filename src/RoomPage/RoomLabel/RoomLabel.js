import React, { useState, useEffect } from 'react'
import ScreenRecording from '../Recording/ScreenRecording';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
export default function RoomLabel({ roomId, getImage }) {

    const [time, setTime] = useState(moment().format('LT'));

    useEffect(() => {
        setInterval(() =>  setTime(moment().format("LT")),1000);
    }, [time]);
    return (
        <div className="room_label">
            <div className="room-label-center-content">
                <div className="live-time">
                    {time.toLocaleString()}
                </div>

                <div className="my-flex">
                    <p className="room_label_paragraph">ID :{roomId}</p>
                    <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        className="copy-icon"
                        onClick={() => { navigator.clipboard.writeText(roomId) }
                        }
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </div>
                <ScreenRecording />
            </div>


        </div>
    )
}
