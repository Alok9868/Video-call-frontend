import React ,{useState} from 'react'
import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from './MessagesContainer';
import NewMessage from './NewMessage';
import ConversationNotChosen from './ConversationNotChosen';
import {connect} from 'react-redux';
 function DirectChat({activeConversation,directChatHistory}) {
    const [messages,setMessages] = useState([]);
    console.log('====================================');
    console.log(activeConversation);
    console.log('====================================');
    return (
        <div className="direct_chat_container">
        {
            activeConversation ? <>
            <DirectChatHeader activeConversation={activeConversation} />
            <MessagesContainer messages={messages} />
            <NewMessage />
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
