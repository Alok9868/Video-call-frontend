import * as wss from './wss';
import store from '../store/store'
import { setShowOverlay, setMessages, setActiveConversation } from '../store/actions';
import { fetchTurnCredentials, getTurnIceServers } from '../utils/turn'
import { getIdentity } from '../utils/apiRequests';
import moment from 'moment';
import Peer from 'simple-peer';
let localstream;
let peers = {};
let streams = [];
const messengerChannel = "messenger";
let sendingstream = null;
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
const constraints = {
    video: {
        noiseSuppression: true,
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        aspectRatio: 1.777777778,
        frameRate: { max: 30 },
        facingMode: { exact: "user" }
    },
    audio: { echoCancellation: true }
};
export const getLocalPreviewAndInitConnection = async (isRoomHost, identity, roomId = null, onlyAudio, onlyVideo, socketId) => {
    // await fetchTurnCredentials();
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            localstream = stream;
            sendingstream = stream;

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
    await fetchTurnCredentials();
}
function showLocalVideoPreview(stream, identity) {

    const videosContainer = document.getElementById("videos_portal");
    videosContainer.classList.add("videos_portal_styles");
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
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
    videoElement.autoPlay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;
    videoElement.onloadedmetadata = () => {
        videoElement.play();
    }
    videoElement.addEventListener('click', () => {
        if (videoElement.classList.contains('full_screen')) {
            videoElement.classList.remove('full_screen');
            identityElement.classList.remove('full-screen-name-pos');


        }
        else {
            videoElement.classList.add('full_screen');
            identityElement.classList.add('full-screen-name-pos');
        }
    }
    )
    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(identityElement);
    // const participants = store.getState().participants;
    // const participant = participants.find((p) => p.socketId === connUserSocketId);

    // if (participant?.onlyAudio) {
    //     videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
    // } else {
    //     videoContainer.style.position = "static";
    // }
    videoContainer.style.position = "static";
    videosContainer.appendChild(videoContainer);
}

// const getconfiguration = async () => {
//     const turnIceServers = await getTurnIceServers();
//     // { url: "stun:stun01.sipphone.com" },
//     //         { url: "stun:stun.ekiga.net" },
//     //         { url: "stun:stun.fwdnet.net" },
//     //         { url: "stun:stun.ideasip.com" },
//     //         { url: "stun:stun.iptel.org" },
//     //         { url: "stun:stun.rixtelecom.se" },
//     //         { url: "stun:stun.schlund.de" },
//     //         { url: "stun:stun.l.google.com:19302" },
//     //         { url: "stun:stun1.l.google.com:19302" },
//     //         { url: "stun:stun2.l.google.com:19302" },
//     //         { url: "stun:stun3.l.google.com:19302" },
//     //         { url: "stun:stun4.l.google.com:19302" },
//     //         { url: "stun:stunserver.org" },
//     //         { url: "stun:stun.softjoys.com" },
//     //         { url: "stun:stun.voiparound.com" },
//     //         { url: "stun:stun.voipbuster.com" },
//     //         { url: "stun:stun.voipstunt.com" },
//     //         { url: "stun:stun.voxgratia.org" },
//     //         { url: "stun:stun.xten.com" },
//     //         {
//     //           url: "turn:numb.viagenie.ca",
//     //           credential: "muazkh",
//     //           username: "webrtc@live.com"
//     //         },
//     //         {
//     //           url: "turn:192.158.29.39:3478?transport=udp",
//     //           credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
//     //           username: "28224511:1379330808"
//     //         },
//     //         {
//     //           url: "turn:192.158.29.39:3478?transport=tcp",
//     //           credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
//     //           username: "28224511:1379330808"
//     //         },
//     //         {
//     //           url: "turn:turn.bistri.com:80",
//     //           credential: "homeo",
//     //           username: "homeo"
//     //         },
//     //         {
//     //           url: "turn:turn.anyfirewall.com:443?transport=tcp",
//     //           credential: "webrtc",
//     //           username: "webrtc"
//     // },
//     // turnIceServers.then((server) => {
//     //     console.log(server);
//     //     return {
//     //         iceServers: [
//     //             // { urls: 'stun:stun.l.google.com:19302' },
//     //             // { urls: 'stun:stun1.l.google.com:19302' },
//     //             // { urls: 'stun:stun2.l.google.com:19302' },
//     //             // { urls: 'stun:stun3.l.google.com:19302' },
//     //             // { urls: 'stun:stun4.l.google.com:19302' },
//     //             // {
//     //             //   url: 'turn:turn.bistri.com:80',
//     //             //   credential: 'homeo',
//     //             //   username: 'homeo',
//     //             // },
//     //             // {
//     //             //   url: 'turn:turn.anyfirewall.com:443?transport=tcp',
//     //             //   credential: 'webrtc',
//     //             //   username: 'webrtc',
//     //             // },
//     //         server,
//     //         ]
//     //     }

//     // })
//     //     .catch((error) => {
//     //         console.log('using turn server only', error);
//     //         return {
//     //             iceServers:
//     //                 [
//     //                     // {
//     //                     //     urls: ["stun:bn-turn1.xirsys.com"]
//     //                     // },
//     //                     // {
//     //                     //     username: "tvT1RdHwfrPKqkBCX2St3XVIRoVNaXNv5Oyl8g1BoMAZKS0uUD8fADX480NwhjEwAAAAAGF6m7dBbG9r",
//     //                     //     credential: "1ce53e48-37ed-11ec-9247-0242ac140004",
//     //                     //     urls: ["turn:bn-turn1.xirsys.com:80?transport=udp", "turn:bn-turn1.xirsys.com:3478?transport=udp", "turn:bn-turn1.xirsys.com:80?transport=tcp", "turn:bn-turn1.xirsys.com:3478?transport=tcp", "turns:bn-turn1.xirsys.com:443?transport=tcp", "turns:bn-turn1.xirsys.com:5349?transport=tcp"]
//     //                     // },
//     //                     // { urls: 'stun:stun.l.google.com:19302' },
//     //                     // { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
//     //                     // { turn: " 64.233.165.127:19305?transport=udp" },
//     //                     // { turn: "[2A00:1450:4010:C01::7F]:19305?transport=udp" },
//     //                     // { turn: "64.233.165.127:443?transport=tcp" },
//     //                     // { turn: "[2A00:1450:4010:C01::7F]:443?transport=tcp" }
//     //                 ]
//     //         }

//     //     })
//     // {
//     //     urls: ["stun:bn-turn1.xirsys.com"]
//     // },
//     // {
//     //     username: "tvT1RdHwfrPKqkBCX2St3XVIRoVNaXNv5Oyl8g1BoMAZKS0uUD8fADX480NwhjEwAAAAAGF6m7dBbG9r",
//     //     credential: "1ce53e48-37ed-11ec-9247-0242ac140004",
//     //     urls: ["turn:bn-turn1.xirsys.com:80?transport=udp", "turn:bn-turn1.xirsys.com:3478?transport=udp", "turn:bn-turn1.xirsys.com:80?transport=tcp", "turn:bn-turn1.xirsys.com:3478?transport=tcp", "turns:bn-turn1.xirsys.com:443?transport=tcp", "turns:bn-turn1.xirsys.com:5349?transport=tcp"]
//     // },
//     // { urls: 'stun:stun.l.google.com:19302' },
//     // { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },

//     // if (turnIceServers) {
//     //     return {
//     //       iceServers: [
//     //         {
//     //           urls: "stun:stun.l.google.com:19302",
//     //         },
//     //         ...turnIceServers,
//     //       ],
//     //     };
//     //   } else {
//     //     console.warn("Using only STUN server");
//     //     return {
//     //       iceServers: [
//     //         {
//     //           urls: "stun:stun.l.google.com:19302",
//     //         },
//     //       ],
//     //     };
//     //   }

//     console.log(turnIceServers);
//     turnIceServers.then((servers) => {
//         const turnserver = {
//             iceServers: [
//                 {
//                     urls: "stun:stun.l.google.com:19302",
//                 },
//                 ...servers,
//             ]
//         }
//         console.log(turnserver);
//         return "hello";

//     }).catch((err) => {
//         console.log('error in getting servers', err);
//         // return {
//         //     iceServers: [
//         //                 {
//         //                   urls: "stun:stun.l.google.com:19302",
//         //                 },
//         //               ]
//         // }
//         return "fuck you";
//     })


// }


const getServerConfig = async () => {
    const turnIceServers = await getTurnIceServers();
    console.log('====================================');
    console.log(turnIceServers);
    console.log('====================================');
    // let returningserver;
    if (turnIceServers) {
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
                ...turnIceServers,
            ],
        };
    } else {
        console.warn("Using only STUN server");
        return {
            iceServers: [
                { url: "stun:stun01.sipphone.com" },
                { url: "stun:stun.ekiga.net" },
                { url: "stun:stun.fwdnet.net" },
                { url: "stun:stun.ideasip.com" },
                { url: "stun:stun.iptel.org" },
                { url: "stun:stun.rixtelecom.se" },
                { url: "stun:stun.schlund.de" },
                { url: "stun:stun.l.google.com:19302" },
                { url: "stun:stun1.l.google.com:19302" },
                { url: "stun:stun2.l.google.com:19302" },
                { url: "stun:stun3.l.google.com:19302" },
                { url: "stun:stun4.l.google.com:19302" },
                { url: "stun:stunserver.org" },
                { url: "stun:stun.softjoys.com" },
                { url: "stun:stun.voiparound.com" },
                { url: "stun:stun.voipbuster.com" },
                { url: "stun:stun.voipstunt.com" },
                { url: "stun:stun.voxgratia.org" },
                { url: "stun:stun.xten.com" },
                {
                    url: "turn:numb.viagenie.ca",
                    credential: "muazkh",
                    username: "webrtc@live.com"
                },
                {
                    url: "turn:192.158.29.39:3478?transport=udp",
                    credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
                    username: "28224511:1379330808"
                },
                {
                    url: "turn:192.158.29.39:3478?transport=tcp",
                    credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
                    username: "28224511:1379330808"
                },
                {
                    url: "turn:turn.bistri.com:80",
                    credential: "homeo",
                    username: "homeo"
                },
                {
                    url: "turn:turn.anyfirewall.com:443?transport=tcp",
                    credential: "webrtc",
                    username: "webrtc"
                },
            ],
        };
    }


}
export const prepareNewPeerConnection = async (connUserSocketId, isInitiator) => {

    const configuration = getServerConfig();
    let serverconfig;
    await configuration.then((server) => {
        serverconfig = server;
    }).catch((error) => { console.log(error); });
    console.log(serverconfig);
    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: serverconfig,
        // stream: localstream,
        stream: sendingstream,
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
    peers[connUserSocketId].on('stream', async (stream) => {
        await addStream(stream, connUserSocketId);
        streams.push(stream)
    });
    peers[connUserSocketId].on('data', (data) => {
        const messageData = JSON.parse(data);
        appendNewMessage(messageData);
    })

}


// function getAudioOnlyLabel() {
//     const labelContainer = document.createElement('div');
//     labelContainer.classList.add('label_only_audio_container');
//     const label = document.createElement('p');
//     label.classList.add('label_only_audio_text');
//     label.innerHTML = "Only Audio";
//     labelContainer.appendChild(label);
//     return labelContainer;
// }
export const handleSignalingData = (data) => {
    peers[data.connUserSocketId].signal(data.signal);
}
export const removePeerConnection = (data) => {
    const { socketId } = data;
    const removeParticipant = store.getState().participants.find((participant) => socketId === participant.socketId);
    if (store.getState().activeConversation && store.getState().activeConversation.socketId === removeParticipant.socketId) {
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
        sendingstream = screenSharingStream;
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