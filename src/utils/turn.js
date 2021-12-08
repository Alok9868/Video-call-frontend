import * as api from './apiRequests';
let TURNIceServers=null;


export const fetchTurnCredentials =async() => {
    const responseData = await api.getTurnCredentials(); 
    if(responseData.responseToken?.iceServers )
    {   
        TURNIceServers=responseData.responseToken.iceServers;
    }
    else if(responseData.token?.iceServers)
    { 
        TURNIceServers=responseData.token.iceServers;
    }
    // console.log(TURNIceServers);
    return TURNIceServers;
}
export const getTurnIceServers = async() =>{
    return TURNIceServers;
}