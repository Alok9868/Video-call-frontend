import React, { useEffect, useState, createRef } from 'react'
import './RoomPage.css'
import ChatSection from './Chatsection/ChatSection'
import ParticipantsSection from './ParticipantSection/ParticipantsSection'
import VideoSection from './VideoSection/VideoSection'
import RoomLabel from './RoomLabel/RoomLabel'
import * as WebRTCHandler from '../utils/WebRTCHandler'
import Overlay from './Overlay'
import { connect } from 'react-redux'
import { ScreenCapture } from 'react-screen-capture';
// import ScreenCapture from './screencapture/ScreenCapture';
import { useScreenshot } from 'use-react-screenshot'
import { nanoid } from 'nanoid'
import html2canvas from 'html2canvas';
import { Navigate } from 'react-router-dom';


function RoomPage({ isRoomHost, identity, roomId, showOverlay, connectOnlyWithAudio, connectOnlyWithVideo, streams, socketId }) {

    const [screenCapture, setScreenCapture] = useState('');
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const [showChatSection, setShowChatSection] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    // async function getImage() {
    //     const a = await takeScreenshot(ref.current);
    //     // console.log(image);
    //     console.log(a);
    //     // handleSave(); 

    // }
    useEffect(() => {
        window.onpopstate = e => {
            window.location.reload(); 
        }
    })
    // const getImage = async() => await takeScreenshot(ref.current);
    function getImage() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        const video=document.getElementById('alok');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img_data = canvas.toDataURL('image/jpg');
        const downloadLink = document.createElement('a');
        let fileName = nanoid();
         fileName = fileName+ 'react-screen-capture.png';
        downloadLink.href = img_data;
        downloadLink.download = fileName;
        downloadLink.click();

        // html2canvas(document.getElementById('grandfather')).then(canvas => {
        //     const screenCaptureSource = canvas.toDataURL();
        // const downloadLink = document.createElement('a');
        // let fileName = nanoid();
        //  fileName = fileName+ 'react-screen-capture.png';
        // downloadLink.href = screenCaptureSource;
        // downloadLink.download = fileName;
        // downloadLink.click();

        // } 

        //   ) 
    }

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
                connectOnlyWithVideo,
                socketId
            )
        }

    }, [])
    return     <div id="room" className="room_container" ref={ref}>
            {
                showParticipants ?
                    <ParticipantsSection
                        setShowParticipants={setShowParticipants}
                    /> : " "
            }

            <VideoSection
                streams={streams}
                socketId={socketId}
                setShowChatSection={setShowChatSection}
                showChatSection={showChatSection}
                setShowParticipants={setShowParticipants}
                showParticipants={showParticipants}
            />
            <RoomLabel
                roomId={roomId}
                getImage={getImage}
            />

            {
                showChatSection ? <ChatSection
                    setShowChatSection={setShowChatSection}
                /> : " "
            }

            {showOverlay && <Overlay />}

        </div>
    
}
const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}
export default connect(mapStoreStateToProps)(RoomPage);