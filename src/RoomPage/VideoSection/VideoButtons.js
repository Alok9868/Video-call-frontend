import React from 'react'
import CameraButton from './CameraButton'
import MicButton from './MicButton'
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton'
import LeaveRoomButton from './LeaveRoomButton'
import ChatIcon from '@mui/icons-material/Chat';
export default function VideoButtons({setShowChatSection,showChatSection}) {
    return (
        <div className="video_buttons_container">
             <MicButton />
            <CameraButton />
            <LeaveRoomButton />
            <SwitchToScreenSharingButton />
            <ChatIcon 
            onClick={()=>{setShowChatSection(!showChatSection)}}
            />
        </div>
    )
}
