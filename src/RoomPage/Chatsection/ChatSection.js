import React from 'react'
import ChatLabel from './ChatLabel';
import Messages from './Messages';
import NewMessage from './NewMessage';

export default function ChatSection({ setShowChatSection }) {
    return (
        <div className="chat_section_container">
            <ChatLabel
                setShowChatSection={setShowChatSection}
            />
            <Messages />
            <NewMessage />
        </div>
    )
}
