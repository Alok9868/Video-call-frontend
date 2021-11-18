import React, { useState, useEffect } from 'react'
import Switchimg from '../../resources/switchToScreenSharing (1).svg';
import LocalScreenSharingPreview from './LocalScreenSharingPreview';
import * as WebRTCHandler from '../../utils/WebRTCHandler'
const constraits = {
    audio: false,
    video: true,
};
let stream = null;
export default function SwitchToScreenSharingButton() {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constraits);
                stream.getVideoTracks()[0].onended = function () {
                    WebRTCHandler.toggleScreenShare(!isScreenSharingActive);
                    setIsScreenSharingActive(false);
                    console.log(screenSharingStream);
                    // screenSharingStream.getTracks().forEach((t)=>t.stop() );
                    setScreenSharingStream(null);
                    console.log('screen recording stopped');
                };

            }
            catch (err) {
                console.log('err occured in screenSharingStream', err);
            }
            if (stream) {
                setScreenSharingStream(stream);
                WebRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
                setIsScreenSharingActive(true);


            }

        }
        else {
            WebRTCHandler.toggleScreenShare(isScreenSharingActive);
            setIsScreenSharingActive(false);
            screenSharingStream.getTracks().forEach((t) => t.stop());
            setScreenSharingStream(null);
        }

        setIsScreenSharingActive(!isScreenSharingActive);
    }

    return (
        <>
            <div className="video_button_container">
                <img
                    src={Switchimg}
                    onClick={handleScreenShareToggle}
                    className="video_button_image"
                    alt="Screen Share"
                />
            </div>
            {
                isScreenSharingActive ? <LocalScreenSharingPreview stream={screenSharingStream} /> : ""
            }
        </>

    )
}
