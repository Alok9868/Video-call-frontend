import React from 'react'
// import CheckImg from '../resources/check (1).png'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
export default function OnlyAudioWithCheckbox({
    setConnectOnlyWithAudio,
    connectOnlyWithAudio
}) {

    const handleConnectionTypeChange = () => {
        setConnectOnlyWithAudio(!connectOnlyWithAudio)
    }
    return (
        <div className="checkbox_container">
            <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
                {
                    connectOnlyWithAudio ? <MicIcon className="join-room-icons-size" /> :<MicOffIcon className="join-room-icons-size"/>
                }
            </div>
            <p className="checkbox_container_paragraph">
                Audio
            </p>

        </div>
    )
}
