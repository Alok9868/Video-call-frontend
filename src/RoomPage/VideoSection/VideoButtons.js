import React from 'react'
import CameraButton from './CameraButton'
import MicButton from './MicButton'
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton'
import LeaveRoomButton from './LeaveRoomButton'
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import Tooltip from '@mui/material/Tooltip';
export default function VideoButtons({ setShowChatSection, showChatSection, setShowParticipants, showParticipants }) {


    return (
        <div className="video_buttons_container">
            <Tooltip title="Participants" placement="top">
                <div className="video_button_container cursor">
                    <GroupIcon
                        onClick={() => { setShowParticipants(!showParticipants) }}
                    />
                </div>
            </Tooltip>


            <MicButton />
            <CameraButton />


            <LeaveRoomButton />
            <SwitchToScreenSharingButton />


            <Tooltip title="Chat" placement="top">
                <div className="video_button_container cursor">
                    <ChatIcon
                        onClick={() => { setShowChatSection(!showChatSection) }}
                    />
                </div>
            </Tooltip>






        </div>
    )
}
