import React, { useState } from 'react'
import JoinRoomInputs from './JoinRoomInputs';
import { connect } from 'react-redux';
import { setConnectOnlyWithAudio, setRoomId, setIdentity, setConnectOnlyWithVideo } from '../store/actions'
import ErrorMessage from './ErrorMessage'
import JoinRoomButtons from './JoinRoomButtons';
import { getRoomExists } from '../utils/apiRequests'
import { useNavigate } from 'react-router-dom';
import OnlyAudioWithCheckbox from "./OnlyAudioWithCheckbox";
import OnlyVideoWithCheckbox from "./OnlyVideoWithCheckbox";
import cookie from 'react-cookies';

function JoinRoomContent(props) {
    const {
        isRoomHost,
        setRoomIdAction,
        setIdentityAction,
        setConnectOnlyWithAudio,
        connectOnlyWithAudio,
        setConnectOnlyWithVideo,
        connectOnlyWithVideo
    } = props;
    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    async function handleJoinRoom() {
        // joining the room
        // if (nameValue === '') {
        //     window.alert('Please enter a valid name');
        //     return;
        // }
        setIdentityAction(cookie.load('displayName'));
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

            <div className="icons-join-div">
            <OnlyAudioWithCheckbox
                setConnectOnlyWithAudio={setConnectOnlyWithAudio}
                connectOnlyWithAudio={connectOnlyWithAudio}
            />
            <OnlyVideoWithCheckbox
                setConnectOnlyWithVideo={setConnectOnlyWithVideo}
                connectOnlyWithVideo={connectOnlyWithVideo}
            />
            </div>
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
    // dispatch is used to store new object in store state
    return {
        setConnectOnlyWithAudio: (onlyWithAudio) => dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
        setConnectOnlyWithVideo: (onlyWithVideo) => dispatch(setConnectOnlyWithVideo(onlyWithVideo))
    }

}
export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomContent);