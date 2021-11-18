import React, { useState } from 'react'
import ScreenRecording from '../Recording/ScreenRecording'
export default function RoomLabel({ roomId }) {
    return (
        <div className="room_label">
            <p className="room_label_paragraph">ID :{roomId}</p>
            <ScreenRecording    />
        </div>
    )
}
