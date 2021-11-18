import React from 'react'
import ScreenRecording from '../Recording/ScreenRecording';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
export default function RoomLabel({ roomId }) {
    return (
        <div className="room_label">
            <p className="room_label_paragraph">ID :{roomId}</p>
            <button>
                <ContentCopyIcon
                    onClick={() => { navigator.clipboard.writeText(roomId) }}
                />
            </button>

            <ScreenRecording />
        </div>
    )
}
