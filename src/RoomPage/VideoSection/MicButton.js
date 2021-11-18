import React ,{useState} from 'react'
import MicButtonImg from '../../resources/mic (1).svg'
import MicButtonOffImg from '../../resources/micOff (1).svg'
import * as WebRTCHandler from '../../utils/WebRTCHandler'
export default function MicButton() {

    const [isMicMuted,setIsMicMuted]=useState(false);
    function handleMicButtonPressed(){
        WebRTCHandler.toggleMic(isMicMuted);
        setIsMicMuted(!isMicMuted);
    }
    return (
        <div className="video_button_container">
        <img 
            src={isMicMuted ?  MicButtonOffImg : MicButtonImg}
            alt="Mic"
            onClick={handleMicButtonPressed}
            className="video_button_image"
        />
            
        </div>
    )
}
