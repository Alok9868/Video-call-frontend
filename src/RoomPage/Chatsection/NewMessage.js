import React ,{useState} from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import * as WebRTCHandler from '../../utils/WebRTCHandler'
export default function NewMessage() {
   
    const [message,setNewMessage]=useState('');
    const handleTextChange=(event) => {
        setNewMessage(event.target.value);

    }
    const handleKeyPress=(event) => {
        if(event.key ==='Enter' && message )
        {
            event.preventDefault();
            // console.log('sending message to other');
            // console.log(message);
            sendMessage();
        }
        

    }
    const sendMessage=() => {
        if(message.length > 0){
            WebRTCHandler.sendMessageUsingDataChannel(message);
            setNewMessage('');

        }

    }
   
    return (
        <div className="new_message_container">
        <input 
            className="new_message_input"
            value={message}
            onChange={handleTextChange}
            placeholder="Enter New Message ..."
            type="text"
            onKeyDown={handleKeyPress}
        />
        {/* <button 
        className="new_message_button"
        alt="New Message"
        onClick={sendMessage}
        >Submit</button> */}
        <SendRoundedIcon 
        className="new_message_button"
        onClick={sendMessage}
        />
            
        </div>
    )
}
