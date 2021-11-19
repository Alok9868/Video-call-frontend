import React, { useState} from 'react'
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
            // try {
                await navigator.mediaDevices.getDisplayMedia(constraits).then((stream) => {
                    console.log('====================================');
                    console.log(stream);
                    console.log('====================================');
                    setScreenSharingStream(stream);
                    WebRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
                    setIsScreenSharingActive(true);

                    stream.getVideoTracks()[0].onended = function () {
                        WebRTCHandler.toggleScreenShare(!isScreenSharingActive);
                        setIsScreenSharingActive(false);
                        console.log(screenSharingStream);
                        // screenSharingStream.getTracks().forEach((t)=>t.stop() );
                        setScreenSharingStream(null);
                        console.log('screen recording stopped');
                    };
                    setIsScreenSharingActive(!isScreenSharingActive);
                
                }).catch((error) => {
                    console.log('====================================');
                    console.log('error in screen sharing',error);
                    console.log('====================================');
                    return;
                })
                

            // }
            // catch (err) {
            //     console.log('err occured in screenSharingStream', err);
            // }
            // if (stream) {
               


            // }

        }
        else {
            WebRTCHandler.toggleScreenShare(isScreenSharingActive);
            setIsScreenSharingActive(false);
            screenSharingStream.getTracks().forEach((t) => t.stop());
            setScreenSharingStream(null);
            setIsScreenSharingActive(!isScreenSharingActive);
        }
       
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
