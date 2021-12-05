import React, { useState, useEffect } from 'react'
import ScreenRecording from '../Recording/ScreenRecording';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
export default function RoomLabel({ roomId, getImage }) {

    const [time, setTime] = useState(moment().format('LT'));

    useEffect(() => {
        setInterval(() => setTime(moment().format("LT")), 1000);
    }, [time]);
    return (
        <div className="room_label">
            <div className="room-label-center-content">
                <div className="live-time">
                {time.toLocaleString()}
                </div>
                

                <div className="my-flex">
                <Tooltip title="meeting-room-id" placement="top" >
                    <p className="room_label_paragraph">
                    ID :{roomId}
                    
                    </p>
                    </Tooltip>
                    <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        className="copy-icon"
                        onClick={() => { navigator.clipboard.writeText(roomId) }
                        }
                    >
                    <Tooltip  title="copy" placement="top">
                    <ContentCopyIcon />
                    </Tooltip>
                    
                    </IconButton>
                </div>
                <div>
                    <ScreenRecording />
                </div>
            </div>


        </div>
    )
}


