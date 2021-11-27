import React ,{useState ,useEffect } from 'react'
import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from './MessagesContainer';
import NewMessage from './NewMessage';
import ConversationNotChosen from './ConversationNotChosen';
import {connect} from 'react-redux';


const getDirectChatHistory = (directChatHistory,socketId=null) => {
    if(!socketId || !directChatHistory) {
        return [];
    }

    // directChatHistory.forEach(h=>{
    //     console.log(h);
    // })


    const history = directChatHistory.find( history => history.socketId === socketId);

    console.log(history);
    return history ? history.chatHistory : [];

}
 function DirectChat({activeConversation,directChatHistory}) {
    const [messages,setMessages] = useState([]);
    useEffect(() => {
        setMessages(
            getDirectChatHistory
            (directChatHistory,
            activeConversation ? activeConversation.socketId : null
            )
            );
    },[activeConversation,directChatHistory]);
    return (
        <div className="direct_chat_container">
        {
            activeConversation ? <>
            <DirectChatHeader activeConversation={activeConversation} />
            <MessagesContainer messages={messages} />
            <NewMessage 
            activeConversation={activeConversation}
            directChatHistory={directChatHistory}
            />
            </> : <ConversationNotChosen />
        }
           {/* { !activeConversation && <ConversationNotChosen />} */}
        </div>
    )
}
const mapStoreStateToProps = (state) => {
    return {
        ...state
    }
}
export default connect(mapStoreStateToProps)(DirectChat);
