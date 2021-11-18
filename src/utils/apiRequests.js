import axios from 'axios';
import {server} from '../baseurl';
const  serverApi=`${server}/api`;

export  const  getRoomExists = async(roomID)=>{
    const response = await axios.get(`${serverApi}/room-exists/${roomID}`);
    return response.data
}
export const getTurnCredentials = async ()=>{
    const response=await axios.get(`${serverApi}/get-turn-credentials`);
    return response.data;
    
}