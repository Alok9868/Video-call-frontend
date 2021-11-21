import React from 'react'
import SingleMessage from './SingleMessage'
export default function MessagesContainer({ messages }) {
    return (
        <div className="direct_messages_container">
            {
                messages.map((message) => {
                    return (<SingleMessage
                        messageContent={message.messageContent}
                        identity={message.identity}
                        isAuthor={message.isAuthor}
                        key={`${message.messageContent}-${message.identity}-${message.key}`}
                    />)

                })
            }
        </div>
    )
}
