import React ,{useRef ,useEffect} from "react";
import { connect } from "react-redux";

const Message = ({ author, content, sameAuthor, messageCreatedByMe ,time}) => {
  const alignClass = messageCreatedByMe
    ? "message_align_right"
    : "message_align_left";

  const authorText = messageCreatedByMe ? "You" : author;

  const contentAdditionalStyles = messageCreatedByMe
    ? "message_right_styles"
    : "message_left_styles";

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className="message_title">{authorText} </p>}
      <p className={`message_content ${contentAdditionalStyles}`}>{content}    {time} </p>
    </div>
  );
};

const Messages = ({ messages ,socketId }) => {


  const scrollRef=useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({behavior: 'smooth'})

  },[messages])


  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =  index > 0 && message.socketId === messages[index - 1].socketId;
        const messageCreatedByMe=socketId === message.socketId;
        return (
          <Message
            key={`${message.content}${index}`}
            author={message.identity}
            content={message.content}
            sameAuthor={sameAuthor}
            messageCreatedByMe={messageCreatedByMe}
            time={message.time}
          />
        );
      })}
      <div ref={scrollRef} ></div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Messages);
