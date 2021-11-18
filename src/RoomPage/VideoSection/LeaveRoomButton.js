import React from 'react'

export default function LeaveRoomButton() {
    const handleRoomDisconnection=() => {
        const siteURL = window.location.origin;
        window.location.href=siteURL;
    }
    return (
        <div className="video_button_container">
            <button className="video_button_end" onClick={handleRoomDisconnection}>
            Leave Room
            </button>
        </div>
    )
}
