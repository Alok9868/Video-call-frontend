import React from 'react'
import ParticipantsLabel from './ParticipantsLabel'
import Participants from './Participants'
import DirectChat from './DirectChat/DirectChat';
export default function ParticipantsSection() {
    return (
        <div className="participants_section_container">
            <ParticipantsLabel />
            <Participants />
            <DirectChat />
        </div>
    )
}
