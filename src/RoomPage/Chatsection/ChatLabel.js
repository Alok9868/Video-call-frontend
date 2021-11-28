import React from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function ChatLabel({setShowChatSection}) {

    function close() {
        console.log('====================================');
        console.log('close');
        console.log('====================================');
        setShowChatSection(false);
    }
    return (
         <div className="chat_label_container">
      <span className="chat_label_paragraph">PUBLIC CHAT</span>
      {/* <CloseIcon 
        onClick={close} 
      /> */}
      <CancelRoundedIcon onClick={close} className="chat-close-icon" />
      {/* <button onClick={close}> close</button> */}
    </div>
    )
}
