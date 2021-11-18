import React from 'react'
import CameraButton from './CameraButton'
import MicButton from './MicButton'
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton'
import LeaveRoomButton from './LeaveRoomButton'
export default function VideoButtons(props) {
    return (
        <div className="video_buttons_container">
             <MicButton />
            <CameraButton />
            <LeaveRoomButton />
            <SwitchToScreenSharingButton />
        </div>
    )
}
