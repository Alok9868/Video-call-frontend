import React from 'react'
import ParticipantsLabel from './ParticipantsLabel'
import Participants from './Participants'
import './ParticipantsSection.css'
export default function ParticipantsSection() {
    return (
        <div className="participants_section_container">
            <ParticipantsLabel />
            <Participants />
        </div>
    )
}
