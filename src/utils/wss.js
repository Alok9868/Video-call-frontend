import io from 'socket.io-client';
import store from '../store/store'
import * as WebRTCHandler from './WebRTCHandler'
import {setRoomId ,setParticipants} from '../store/actions'
import {server} from '../baseurl';
const Server=server;
let socket=null;
export const connectWithSocketIOServer = ()=>{
    socket=io(Server);
    socket.on('connect',()=>{
        console.log('successfully connected with socket io server');
        console.log(socket.id)
    });
    socket.on('room-id',(data)=>{
        // console.log(data)
        const {roomId}=data;
        store.dispatch(setRoomId(roomId));
    });
    socket.on('room-update',(data)=>{
        const {connectedUsers}=data;
        store.dispatch(setParticipants(connectedUsers))
    });
    socket.on('conn-prepare',(data)=>{
        const {connUserSocketId}=data;
        WebRTCHandler.prepareNewPeerConnection(connUserSocketId,false);
        socket.emit('conn-init',{ connUserSocketId : connUserSocketId})

    });
    socket.on('conn-signal',(data)=>{
        WebRTCHandler.handleSignalingData(data);
    });
    socket.on('conn-init',(data)=>{
        const {connUserSocketId}=data;
        WebRTCHandler.prepareNewPeerConnection(connUserSocketId,true);
    });
    socket.on('user-disconnected',(data)=>{
        WebRTCHandler.removePeerConnection(data);
    });
    socket.on('new-message',(data)=>{
        console.log('new message come ',data);
        WebRTCHandler.handleNewMessage(data);

    })

}
export const createNewRoom=(identity)=>{
    const data={
        identity: identity
    };
    socket.emit('create-new-room',data);

}
export const joinRoom=(identity,roomId)=>{
    const data={
        identity: identity,
        roomId: roomId
    }
    socket.emit('join-room',data)
}
export const signalPeerData=(data) => {

    socket.emit('conn-signal',data);

};
export const sendMessage=(message) => {
    socket.emit('send-message',message);

}
