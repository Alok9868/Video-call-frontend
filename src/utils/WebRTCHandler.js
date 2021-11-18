import * as wss from './wss';
import store from '../store/store'
import { setShowOverlay, setMessages } from '../store/actions';
import { fetchTurnCredentials, getTurnIceServers } from '../utils/turn'

import Peer from 'simple-peer';
let localstream;
let peers = {};
let streams = [];
const messengerChannel = "messenger"
export const getLocalPreviewAndInitConnection = async (isRoomHost, identity, roomId = null) => {

    await fetchTurnCredentials();
    const constraits = {
        video: true ? {
            // frameRate: 30,
            // noiseSuppression: true,
            // width: { min: 640, ideal: 1280, max: 1920 },
            // height: { min: 480, ideal: 720, max: 1080 }
            width: '480',
            height: '360',
        } : false,
        audio: true,
    }
    navigator.mediaDevices.getUserMedia(constraits)
        .then((stream) => {
            localstream = stream;
            showLocalVideoPreview(localstream);
            store.dispatch(setShowOverlay(false));
            isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId)
        })
        .catch((err) => {
            console.log('error in accessing local stream: ' + err.message);

        })
}
function showLocalVideoPreview(stream) {
    const videosContainer = document.getElementById('videos_portal');
    videosContainer.classList.add('videos_portal_styles');
    const videoContainer = document.createElement('div');
    videosContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    videoElement.autoPlay = true;
    videoElement.muted=true;
    // videoElement.muted = true;
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = () => {
        videoElement.play();
    }
    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);



}
const getconfiguration = () => {
    const turnIceServers = getTurnIceServers();

    turnIceServers.then((server) => {
        return {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                ...server
            ],
        }

    })
    .catch((error) => {
        console.log('using turn server only',error);
        return {
            iceServers:
                [
                    { urls: 'stun:stun.l.google.com:19302' },
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
const addStream = (stream, connUserSocketId) => {
    const videosContainer = document.getElementById('videos_portal');
    const videoContainer = document.createElement('div');
    videoContainer.id = connUserSocketId;
    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
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
    videosContainer.appendChild(videoContainer);
}
export const handleSignalingData = (data) => {
    peers[data.connUserSocketId].signal(data.signal);
}
export const removePeerConnection = (data) => {
    const { socketId } = data;
    const videoContainer = document.getElementById(socketId);
    const videoElement = document.getElementById(`${socketId}-video`);
    if (videoContainer && videoElement) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
        videoContainer.removeChild(videoElement);

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
    const localMessageData = {
        content: messageContent,
        identity,
    };
    //  appendNewMessage(localMessageData);
    const messageData = {
        content: messageContent,
        identity
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