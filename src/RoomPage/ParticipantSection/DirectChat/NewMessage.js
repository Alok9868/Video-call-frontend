import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function NewMessage({ activeConversation, identity }) {

    const [message, setMessage] = useState('');
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }
    function sendMessage() {
        setMessage('');
    }


    return (
        <div className="new_message_container new_message_direct_border">
            <input
                className="new_message_input"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
                type="text"
                placeholder="Enter a new message"
                onKeyDown={handleKeyPress}
            />
            <SendIcon
                className="new_message_button "
                onClick={sendMessage}
            />

        </div>
    )
}
