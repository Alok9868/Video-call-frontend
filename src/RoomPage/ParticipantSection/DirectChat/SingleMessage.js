import React from 'react'

export default function SingleMessage({ isAuthor, messageContent }) {

    const messageStyling = isAuthor ? 'author_direct_message' : 'reciever_direct_message';
    const containerStyling = isAuthor ? 'direct_message_container_author' : 'direct_message_container_reciever';
    return (
        <div className={containerStyling}>
            <p className={messageStyling}>{messageContent}</p>
        </div>
    )
}
