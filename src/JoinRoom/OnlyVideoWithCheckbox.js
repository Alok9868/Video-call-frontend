import React from 'react'
// import CheckImg from '../resources/check (1).png'
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
export default function OnlyVideoWithCheckbox({
    setConnectOnlyWithVideo,
    connectOnlyWithVideo
}) {
    const handleConnectionTypeChange = () => {
        setConnectOnlyWithVideo(!connectOnlyWithVideo)
    }
    return (
        <div className="checkbox_container">
            <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
                {
                    connectOnlyWithVideo ? <VideocamIcon className="join-room-icons-size" /> : <VideocamOffIcon className="join-room-icons-size" />
                }
            </div>
            <p className="checkbox_container_paragraph">
                Video
            </p>

        </div>
    )
}
