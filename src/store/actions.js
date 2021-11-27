const Actions = {
    SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
    SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
    SET_IDENTITY: "SET_IDENTITY",
    SET_ROOM_ID: "SET_ROOM_ID",
    SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
    SET_PARTICIPANTS: "SET_PARTICIPANTS",
    SET_MESSAGES: "SET_MESSAGES",
    SET_CONNECT_ONLY_WITH_VIDEO: "SET_CONNECT_ONLY_WITH_VIDEO",
    SET_ACTIVE_CONVERSATION: "SET_ACTIVE_CONVERSATION",
    SET_DIRECT_CHAT_HISTORY: "SET_DIRECT_CHAT_HISTORY",
    SET_SOCKET_ID: "SET_SOCKET_ID",
    SET_STREAMS: "SET_STREAMS",
    REMOVE_STREAMS: "REMOVE_STREAMS",
}
export const setIsRoomHost = (isRoomHost) => {
    return {
        type: Actions.SET_IS_ROOM_HOST,
        isRoomHost: isRoomHost
    }
}
export const setConnectOnlyWithAudio = (onlyWithAudio) => {
    return {
        type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
        onlyWithAudio
    }

}
export const setConnectOnlyWithVideo = (onlyWithVideo) => {
    return {
        type: Actions.SET_CONNECT_ONLY_WITH_VIDEO,
        onlyWithVideo
    }
}
export const setRoomId = (roomId) => {
    return {
        type: Actions.SET_ROOM_ID,
        roomId: roomId
    }
}
export const setIdentity = (identity) => {
    return {
        type: Actions.SET_IDENTITY,
        identity

    }
}
export const setShowOverlay = (showOverlay) => {
    return {
        type: Actions.SET_SHOW_OVERLAY,
        showOverlay
    }
};
export const setParticipants = (participants) => {
    return {
        type: Actions.SET_PARTICIPANTS,
        participants
    }
};
export const setMessages = (messages) => {
    return {
        type: Actions.SET_MESSAGES,
        messages
    }
};
export const setActiveConversation = (activeConversation) => {
    return {
        type: Actions.SET_ACTIVE_CONVERSATION,
        activeConversation :activeConversation
    }
};
export const setDirectChatHistory = (directChatHistory) => {
    return {
        type: Actions.SET_DIRECT_CHAT_HISTORY,
        directChatHistory 

    }

}
export const setSocketId = (socketId) => {
    return {
        type: Actions.SET_SOCKET_ID,
        socketId
    }

}
export const setStreams = (streams) => {
    return {
        type: Actions.SET_STREAMS,
        streams:streams
    }

}
export const removeStreams = (socketId) => {
    return {
        type: Actions.REMOVE_STREAMS,
        socketId:socketId
    }
}
export default Actions;