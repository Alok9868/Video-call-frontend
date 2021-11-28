import React, { useState } from 'react'
import LocalScreenSharingPreview from './LocalScreenSharingPreview';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import Tooltip from '@mui/material/Tooltip';
import * as WebRTCHandler from '../../utils/WebRTCHandler'
const constraits = {
    audio: false,
    video: true,
};
export default function SwitchToScreenSharingButton() {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            // try {
            await navigator.mediaDevices.getDisplayMedia(constraits).then((stream) => {
                setScreenSharingStream(stream);
                WebRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
                setIsScreenSharingActive(true);

                stream.getVideoTracks()[0].onended = function () {
                    WebRTCHandler.toggleScreenShare(!isScreenSharingActive);
                    setIsScreenSharingActive(false);
                    setScreenSharingStream(null);
                    console.log('screen recording stopped');
                };
                // setIsScreenSharingActive(!isScreenSharingActive);

            }).catch((error) => {
                console.log('====================================');
                console.log('error in screen sharing', error);
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
            // setIsScreenSharingActive(!isScreenSharingActive);
        }

    }

    return (
        <>
            <div className="video_button_container">
                <Tooltip title="Screen share" placement="top">
                    <ScreenShareIcon className="cursor" onClick={handleScreenShareToggle} />
                </Tooltip>

            </div>
            {
                isScreenSharingActive ? <LocalScreenSharingPreview stream={screenSharingStream} /> : ""
            }
        </>

    )
}
