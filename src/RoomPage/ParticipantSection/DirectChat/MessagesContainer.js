import React, { useEffect, useRef } from 'react'
import SingleMessage from './SingleMessage'
export default function MessagesContainer({ messages }) {

    const scrollRef = useRef();
    useEffect(() => {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="direct_messages_container">
            {
                messages.map((message,index) => {

                    return (
                        <SingleMessage
                            messageContent={message.messageContent}
                            identity={message.identity}
                            isAuthor={message.isAuthor}
                            key={`${message.messageContent}-${message.identity}-${index}`}
                            time={message.time}
                        />
                    )

                })
            }
            <div ref={scrollRef} ></div>
        </div>
    )
}
