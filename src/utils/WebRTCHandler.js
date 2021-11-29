import * as wss from './wss';
import store from '../store/store'
import { setShowOverlay, setMessages ,setActiveConversation } from '../store/actions';
import { fetchTurnCredentials, getTurnIceServers } from '../utils/turn'
import { getIdentity } from '../utils/apiRequests';
import moment from 'moment';
import Peer from 'simple-peer';
let localstream;
let peers = {};
let streams = [];
const messengerChannel = "messenger";
// const onlyAudioConstraints = {

//     video: false,
//     audio: true,


// }
// const defaultConstraints = {
//     video:
//     {
//         frameRate: 30,
//         noiseSuppression: true,
//         width: { min: 640, ideal: 1280, max: 1920 },
//         height: { min: 480, ideal: 720, max: 1080 }
//     },
//     // width: '480',
//     // height: '360',

//     audio: true,

// }
const constraints =
{
    video: true ? {
        frameRate: 30,
        noiseSuppression: true,
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
        // width: '480',
        // height: '360',
    } : false,
    audio: true,
}
export const getLocalPreviewAndInitConnection = async (isRoomHost, identity, roomId = null, onlyAudio, onlyVideo, socketId) => {
await fetchTurnCredentials();
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {

            localstream = stream;
            if (!onlyAudio) {
                localstream.getAudioTracks()[0].enabled = false;
            }
            if (!onlyVideo) {
                localstream.getVideoTracks()[0].enabled = false;
            }
            showLocalVideoPreview(localstream, identity);

            store.dispatch(setShowOverlay(false));
            isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId)
        })
        .catch((err) => {
            console.log('error in accessing local stream: ' + err.message);
            // navigate to error in accessing local stream

        });
}
function showLocalVideoPreview(stream, identity) {

    const videosContainer = document.getElementById("videos_portal");
    videosContainer.classList.add("videos_portal_styles");
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.setAttribute("id",'alok');
    const identityElement = document.createElement('p');
    identityElement.innerHTML = identity;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    // identityElement.classList.add('user-name-video');


    videoElement.onloadedmetadata = () => {
        videoElement.play();
    };

    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(identityElement);

    // if (!store.getState().connectOnlyWithAudio) {
    //     videoContainer.appendChild(getAudioOnlyLabel());
    // }

    videosContainer.appendChild(videoContainer);

}


const addStream = async (stream, connUserSocketId) => {
    const name = await getIdentity(connUserSocketId);

    const videosContainer = document.getElementById('videos_portal');
    const videoContainer = document.createElement('div');
    videoContainer.id = connUserSocketId;
    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    const identityElement = document.createElement('p');
    identityElement.innerHTML = name;
    videoElement.autPlay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;

    
    videoElement.onloadedmetadata = () => {
        videoElement.play();
    }
    videoElement.addEventListener('click', () => {
        if (videoElement.classList.contains('full_screen')) {
            videoElement.classList.remove('full_screen');
        }
        else {
            videoElement.classList.add('full_screen');
        }
    }
    )

    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(identityElement);
    const participants = store.getState().participants;
    const participant = participants.find((p) => p.socketId === connUserSocketId);

    // if (participant?.onlyAudio) {
    //     videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
    // } else {
    //     videoContainer.style.position = "static";
    // }
    videoContainer.style.position = "static";
    videosContainer.appendChild(videoContainer);
}

const getconfiguration = () => {
    const turnIceServers = getTurnIceServers();
    turnIceServers.then((server) => {
        return {
            iceServers: [
                // { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
                ...server
            ],
        }

    })
        .catch((error) => {
            console.log('using turn server only', error);
            return {
                iceServers:
                    [
                        { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
                    ]
            }

        })




}
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const configuration = getconfiguration();
    peers[connUserSocketId] = new Peer({
        config: configuration,
        initiator: isInitiator,
        stream: localstream,
        channelName: messengerChannel,
    });
    peers[connUserSocketId].on('signal', (data) => {
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId
        };
        // console.log(signalData);
        wss.signalPeerData(signalData);

    });
    peers[connUserSocketId].on('stream', (stream) => {
        console.log('new stream', stream);
        addStream(stream, connUserSocketId);
        streams.push(stream)
    });
    peers[connUserSocketId].on('data', (data) => {
        const messageData = JSON.parse(data);
        appendNewMessage(messageData);
    })

}


function getAudioOnlyLabel() {
    const labelContainer = document.createElement('div');
    labelContainer.classList.add('label_only_audio_container');
    const label = document.createElement('p');
    label.classList.add('label_only_audio_text');
    label.innerHTML = "Only Audio";
    labelContainer.appendChild(label);
    return labelContainer;
}
export const handleSignalingData = (data) => {
    peers[data.connUserSocketId].signal(data.signal);
}
export const removePeerConnection = (data) => {
    const { socketId } = data;
    const removeParticipant = store.getState().participants.find((participant) => socketId === participant.socketId);
    if(store.getState().activeConversation && store.getState().activeConversation.socketId===removeParticipant.socketId)
    {
        store.dispatch(setActiveConversation(null));
    }

    const videoContainer = document.getElementById(socketId);
    const videoEl = document.getElementById(`${socketId}-video`);

    if (videoContainer && videoEl) {
        const tracks = videoEl.srcObject.getTracks();

        tracks.forEach((t) => t.stop());

        videoEl.srcObject = null;
        videoContainer.removeChild(videoEl);
        videoContainer.parentNode.removeChild(videoContainer);

        if (peers[socketId]) {
            peers[socketId].destroy();
        }
        delete peers[socketId];
    }


}
export const toggleMic = (isMicMuted) => {
    localstream.getAudioTracks()[0].enabled = isMicMuted ? true : false;
}
export const toggleVideo = (isLocalVideoDisabled) => {
    localstream.getVideoTracks()[0].enabled = isLocalVideoDisabled ? true : false;
}
export const toggleScreenShare = (isScreenSharingActive, screenSharingStream = null) => {
    if (isScreenSharingActive) {
        switchVideoTracks(localstream);
    }
    else {
        switchVideoTracks(screenSharingStream)
    }

}
const switchVideoTracks = (stream) => {
    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if (peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }

        }
    }
}
const appendNewMessage = (messageData) => {
    const messages = store.getState().messages;
    store.dispatch(setMessages([...messages, messageData]))
}

export const sendMessageUsingDataChannel = (messageContent) => {
    const identity = store.getState().identity;
    const socketId = store.getState().socketId;
    // const localMessageData = {
    //     content: messageContent,
    //     identity,
    //     socketId,
    //     
    // };
    //  appendNewMessage(localMessageData);
    const messageData = {
        content: messageContent,
        identity, 
        socketId,
        time: moment().format("LT")
    };
    wss.sendMessage(messageData);
    // const stringifiedMessageData = JSON.stringify(messageData);
    // for (let socket_id in peers) {
    //     peers[socket_id].send(stringifiedMessageData)
    // }

}
export const handleNewMessage = (data) => {
    const messages = store.getState().messages;
    store.dispatch(setMessages([...messages, data]))

}