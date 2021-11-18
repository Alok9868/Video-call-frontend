import React, { useEffect } from 'react'
import './RoomPage.css'
import ChatSection from './Chatsection/ChatSection'
import ParticipantsSection from './ParticipantSection/ParticipantsSection'
import VideoSection from './VideoSection/VideoSection'
import RoomLabel from './RoomLabel/RoomLabel'
import * as WebRTCHandler from '../utils/WebRTCHandler'
import Overlay from './Overlay'
import { connect } from 'react-redux'

function RoomPage({ isRoomHost, identity, roomId, showOverlay }) {


    useEffect(() => {
        if (!isRoomHost && !roomId) {
            const siteURL = window.location.origin;
            console.log(siteURL);
            window.location.href = siteURL;

        }
        else {
            WebRTCHandler.getLocalPreviewAndInitConnection(
                isRoomHost,
                identity,
                roomId,
            )

        }

    }, [])
    return (
        <div className="room_container">
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
