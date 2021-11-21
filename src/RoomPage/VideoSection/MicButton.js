import React ,{useState} from 'react'
import * as WebRTCHandler from '../../utils/WebRTCHandler'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { connect } from 'react-redux'
 function MicButton({connectOnlyWithAudio}) {

    const [isMicMuted,setIsMicMuted]=useState(!connectOnlyWithAudio);
    function handleMicButtonPressed(){
        WebRTCHandler.toggleMic(isMicMuted);
        setIsMicMuted(!isMicMuted);
    }
    return (
        <div 
        className="video_button_container"
        onClick={handleMicButtonPressed}
        >
        {
            isMicMuted ? <MicOffIcon /> :  <MicIcon />
        }
        {/* <img 
            src={isMicMuted ?  MicButtonOffImg : MicButtonImg}
            alt="Mic"
            
            className="video_button_image"
        /> */}
            
        </div>
    )
}


const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}
export default connect(mapStoreStateToProps)(MicButton);
