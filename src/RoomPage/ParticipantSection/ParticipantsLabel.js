import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function ParticipantsLabel({ setShowParticipants }) {
    return (
        <div className="participants_label_container">
            Participants
            <CloseIcon
                onClick={() => { setShowParticipants(false) }}

            />
        </div>
    )
}
