import * as api from './apiRequests';
let TURNIceServers=null;


export const fetchTurnCredentials =async() => {
    const responseData = await api.getTurnCredentials(); 
    if(responseData.responseToken?.iceServers)
    {   
        TURNIceServers=responseData.responseToken.iceServers;
    }
    return TURNIceServers;
}
export const getTurnIceServers = async() =>{
    return TURNIceServers;
}