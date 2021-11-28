import React, { useState } from 'react'
import * as WebRTCHandler from '../../utils/WebRTCHandler'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Tooltip from '@mui/material/Tooltip';
import { connect } from 'react-redux';

function MicButton({ connectOnlyWithAudio }) {

    const [isMicMuted, setIsMicMuted] = useState(!connectOnlyWithAudio);
    function handleMicButtonPressed() {
        WebRTCHandler.toggleMic(isMicMuted);
        setIsMicMuted(!isMicMuted);
    }
    return (
        <div
            className="video_button_container"
            onClick={handleMicButtonPressed}
        >
            {
                isMicMuted ?
                    <Tooltip title="Unmute" placement="top">
                        <MicOffIcon className="cursor" />
                    </Tooltip> :
                    <Tooltip title="Mute" placement="top">
                        <MicIcon className="cursor" />
                    </Tooltip>

            }

        </div>
    )
}


const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}
export default connect(mapStoreStateToProps)(MicButton);
