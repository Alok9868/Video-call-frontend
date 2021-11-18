import React, { useState } from 'react'
import JoinRoomInputs from './JoinRoomInputs';
import { connect } from 'react-redux';
import OnlyAudioWithCheckbox from './OnlyAudioWithCheckbox';
import { setConnectOnlyWithAudio, setRoomId, setIdentity } from '../store/actions'
import ErrorMessage from './ErrorMessage'
import JoinRoomButtons from './JoinRoomButtons';
import {getRoomExists} from '../utils/apiRequests'
import { useNavigate } from 'react-router-dom';
function JoinRoomContent(props) {
    const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio, setRoomIdAction, setIdentityAction } = props;
    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    async function handleJoinRoom() {
        // joining the room
        setIdentityAction(nameValue)
        if (isRoomHost) {
            createRoom();
        }
        else {
            joinRoom();
        }
    }

    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue);
        const { roomExists, full } = responseMessage;
        if (roomExists) {
            if (full) {
                setErrorMessage('Room  is full')
            }
            else {
                // join room room
                setRoomIdAction(roomIdValue)
                navigate('/room');
            }
        }
        else {
            setErrorMessage('Room Not found')
        }
    }
    const createRoom = () => {
        navigate('/room');
    }

    return (
        <>
            <JoinRoomInputs
                roomIdValue={roomIdValue}
                setRoomIdValue={setRoomIdValue}
                nameValue={nameValue}
                setNameValue={setNameValue}
                isRoomHost={isRoomHost}
            />

            {/* <OnlyAudioWithCheckbox

                setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                connectOnlyWithAudio={connectOnlyWithAudio}
            /> */}
            <ErrorMessage errorMessage={errorMessage} />
            <JoinRoomButtons
                handleJoinRoom={handleJoinRoom}
                isRoomHost={isRoomHost}
            />
        </>
    )
}


const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}
const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio: (onlyWithAudio) => dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
    }

}
export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomContent);