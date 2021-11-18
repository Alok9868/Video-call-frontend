import React from 'react'
import { useNavigate } from 'react-router-dom'
const Button = ({
    buttontext, cancelButton = false, onClickHandler
}) => {
    const buttonClass = cancelButton ? "join_room_cancel_button" : "join_room_success_button";
    return (
        <button className={buttonClass} onClick={onClickHandler}> {buttontext} </button>
    )
}
export default function JoinRoomButtons({ handleJoinRoom, isRoomHost }) {

    const navigate = useNavigate();
    const successButtonText = isRoomHost ? "host" : "Join"
    function pushToIntroductionPage() {

        navigate('/');
    }
    return (
        <div className="join_room_button_container">

            <Button

                buttontext={successButtonText}
                onClickHandler={handleJoinRoom}
            />
            <Button
                buttontext='Cancel'
                cancelButton
                onClickHandler={pushToIntroductionPage}

            />

        </div>
    )
}
