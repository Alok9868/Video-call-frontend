import React from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


export default function ParticipantsLabel({ setShowParticipants }) {
    return (
        <div className="chat_label_container">
           <span className="chat_label_paragraph"> Participants</span>
            {/* <CloseIcon
                onClick={() => { setShowParticipants(false) }}

            /> */}
      <CancelRoundedIcon onClick={() => { setShowParticipants(false) }} className="chat-close-icon" />

        </div>
    )
}
