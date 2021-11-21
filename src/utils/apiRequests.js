import axios from 'axios';
import {server} from '../baseurl';
const  serverApi=`${server}/api`;

export  const  getRoomExists = async(roomID)=>{
    const response = await axios.get(`${serverApi}/room-exists/${roomID}`);
    return response.data
}
export const getIdentity=async(socketId)=>{
    const response = await axios.get(`${serverApi}/${socketId}`);
    const {name} = response.data;
    return name;
}
export const getTurnCredentials = async ()=>{
    const response=await axios.get(`${serverApi}/get-turn-credentials`);
    return response.data;
    
}