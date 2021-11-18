import React from 'react'

export default function ConnectingButton({createRoomButton, buttonText ,onClickHandler}) {
    const buttonClass = createRoomButton ? "create_room_button" : "join_room_button"
    return (
        <button className={buttonClass} onClick={onClickHandler} >
        {buttonText}
        </button>
    )
}
