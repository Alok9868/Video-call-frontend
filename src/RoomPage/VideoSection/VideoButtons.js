import React from 'react'
import CameraButton from './CameraButton'
import MicButton from './MicButton'
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton'
import LeaveRoomButton from './LeaveRoomButton'
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
export default function VideoButtons({ setShowChatSection, showChatSection, setShowParticipants, showParticipants }) {

    console.log(showParticipants);

    return (
        <div className="video_buttons_container">
            <GroupIcon
                onClick={() => { setShowParticipants(!showParticipants) }}
            />
            <MicButton />
            <CameraButton />
            <LeaveRoomButton />
            <SwitchToScreenSharingButton />
            <ChatIcon
                onClick={() => { setShowChatSection(!showChatSection) }}
            />



        </div>
    )
}
