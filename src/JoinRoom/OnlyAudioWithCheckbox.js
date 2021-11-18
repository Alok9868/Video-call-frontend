import React from 'react'
import CheckImg from '../resources/check (1).png'
export default function OnlyAudioWithCheckbox({
    setConnectOnlyWithAudio,
    connectOnlyWithAudio

}) {

    const handleConnectionTypeChange = () => {
        setConnectOnlyWithAudio(!connectOnlyWithAudio)

    }
    return (
        <div className="checkbox_container">
            <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
                {
                    connectOnlyWithAudio && (
                        <img className="checkbox_image" alt="audio" src={CheckImg} />
                    )
                }
            </div>
            <p className="checkbox_container_paragraph">
                Only audio
            </p>

        </div>
    )
}
