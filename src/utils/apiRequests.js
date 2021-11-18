import axios from 'axios';
const  serverApi="http://localhost:8000/api";
export  const  getRoomExists = async(roomID)=>{
    const response = await axios.get(`${serverApi}/room-exists/${roomID}`);
    return response.data
}
export const getTurnCredentials = async ()=>{
    const response=await axios.get(`${serverApi}/get-turn-credentials`);
    return response.data;
    
}