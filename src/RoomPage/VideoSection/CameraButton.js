import React ,{useState} from 'react'
import CameraButtonImg from '../../resources/camera (1).svg';
import CameraButtonOffImg from '../../resources/cameraOff (1).svg';
import * as WebRTCHandler from '../../utils/WebRTCHandler'
export default function CameraButton() {
    const [isLocalVideoDisabled,setIsLocalVideoDisabled]=useState(false);
    function handleVideoButtonPressed() {
        WebRTCHandler.toggleVideo(isLocalVideoDisabled);
        setIsLocalVideoDisabled(!isLocalVideoDisabled)
    }

    return (
        <div className="video_button_container">
            <img 
                src={isLocalVideoDisabled ? CameraButtonOffImg :CameraButtonImg }
                alt="VideoSection"
                className="video_button_image"
                onClick={handleVideoButtonPressed}
            />
        </div>
    )
}
