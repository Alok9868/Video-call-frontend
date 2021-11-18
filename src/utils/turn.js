import React from 'react'
import * as api from './apiRequests';
let TURNIceServers=null;


export const fetchTurnCredentials =async() => {
    const responseData = await api.getTurnCredentials();    
    if(responseData.token?.iceServers)
    { 
        TURNIceServers=responseData.token.iceServers;
    }
    return TURNIceServers;
}
export const getTurnIceServers = async() =>{
    return TURNIceServers;
}