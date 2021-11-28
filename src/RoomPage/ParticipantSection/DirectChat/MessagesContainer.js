import React ,{useEffect ,useRef} from 'react'
import SingleMessage from './SingleMessage'
export default function MessagesContainer({ messages }) {

    const scrollRef=useRef()
    useEffect(() => {

        if(scrollRef){
            scrollRef.current.scrollIntoView({behavior: 'smooth'})
        }

      
    }, [messages])

    return (
        <div className="direct_messages_container">
            {
                messages.map((message) => {

                    return (
                        <SingleMessage
                        messageContent={message.messageContent}
                        identity={message.identity}
                        isAuthor={message.isAuthor}
                        key={`${message.messageContent}-${message.identity}-${message.key}`}
                        time={message.time}
                    />
                    )

                })
            }
            <div ref={scrollRef} ></div>
        </div>
    )
}
