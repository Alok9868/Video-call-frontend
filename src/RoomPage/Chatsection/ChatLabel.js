import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function ChatLabel({setShowChatSection}) {

    function close() {
        console.log('====================================');
        console.log('close');
        console.log('====================================');
        setShowChatSection(false);
    }
    return (
         <div className="chat_label_container">
      <p className="chat_label_paragraph">CHAT</p>
      <CloseIcon 
        onClick={close} 
      />
      <button onClick={close}> close</button>
    </div>
    )
}
