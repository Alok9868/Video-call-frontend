import React, { useEffect, useState, createRef } from 'react'
import './RoomPage.css'
import ChatSection from './Chatsection/ChatSection'
import ParticipantsSection from './ParticipantSection/ParticipantsSection'
import VideoSection from './VideoSection/VideoSection'
import RoomLabel from './RoomLabel/RoomLabel'
import * as WebRTCHandler from '../utils/WebRTCHandler'
import Overlay from './Overlay'
import { connect } from 'react-redux'
// import { ScreenCapture } from 'react-screen-capture';
// import ScreenCapture from './screencapture/ScreenCapture';
import { useScreenshot } from 'use-react-screenshot'
import { nanoid } from 'nanoid'
import html2canvas from 'html2canvas'

function RoomPage({ isRoomHost, identity, roomId, showOverlay, connectOnlyWithAudio, connectOnlyWithVideo }) {

    // const [screenCapture, setScreenCapture] = useState('');
    // const ref = createRef(null);
    // const [image, takeScreenshot] = useScreenshot()
    // async function getImage ()  { 
    //     await takeScreenshot(ref.current);
    //     console.log('====================================');
    //     console.log(image);
    //     console.log('====================================');
    //     handleSave(); 
    
    // }
    function getImage (){
        html2canvas(document.getElementById('videos_portal')).then(canvas => 
            console.log(canvas.toDataURL())
          ) 
    }

    //  const  handleSave = () => {
    //     const screenCaptureSource = image;
    //     const downloadLink = document.createElement('a');
    //     let fileName = nanoid();
    //      fileName = fileName+ 'react-screen-capture.png';
    //     downloadLink.href = screenCaptureSource;
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    //   };
    useEffect(() => {
        if (!isRoomHost && !roomId) {
            const siteURL = window.location.origin;
            window.location.href = siteURL;
        }
        else {
            WebRTCHandler.getLocalPreviewAndInitConnection(
                isRoomHost,
                identity,
                roomId,
                connectOnlyWithAudio,
                connectOnlyWithVideo
            )
        }

    }, [])
    return (
       
        <div className="room_container" >
          <button style={{ marginBottom: '10px' }} onClick={getImage}>
                Take screenshot
            </button>  
            <ParticipantsSection />
            <VideoSection />
            <RoomLabel
                roomId={roomId}
            />
            <ChatSection />
            {showOverlay && <Overlay />}
        </div>
    )
}
const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}
export default connect(mapStoreStateToProps)(RoomPage)
