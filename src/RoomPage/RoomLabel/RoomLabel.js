import React from 'react'
import ScreenRecording from '../Recording/ScreenRecording';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
export default function RoomLabel({ roomId }) {
    return (
        <div className="room_label">
            <p className="room_label_paragraph">ID :{roomId}</p>
            <IconButton 
            color="primary"
             aria-label="add to shopping cart"
              className="copy-icon"
              onClick={() => { navigator.clipboard.writeText(roomId) }
                    }
              >
                <ContentCopyIcon   />
            </IconButton>

            <ScreenRecording />
        </div>
    )
}
