import React, { useState, useEffect } from 'react'
import ScreenRecording from '../Recording/ScreenRecording';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import Timer from '../timer/Timer';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
export default function RoomLabel({ roomId, getImage }) {

    const [time, setTime] = useState(moment().format("LT"));
    const [alarm, setAlarm] = useState(false);

    useEffect(() => {
        setTime(moment().format("LT"));
    }, [time]);
    return (
        <div className="room_label">
        {time.toLocaleString()}
        {
                alarm ? <Timer
                    setAlarm={setAlarm}
                /> : <AddAlertIcon onClick={() => { setAlarm(true) }} />
            }
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
            <ScreenRecording />
            {/* <ScreenshotIcon
                onClick={getImage}

            /> */}

        </div>
    )
}
