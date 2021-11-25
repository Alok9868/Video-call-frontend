import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function ChatLabel({setShowChatSection}) {

    function close() {
        console.log('====================================');
        console.log('close');
        console.log('====================================');
        setShowChatSection(false);
    }
    // className="chat_label_container"
    // className="chat_label_paragraph

    return (
        <div >
        <p>CHAT</p>
        <button onClick={close}  > Close </button>
        <div onClick={close}><CloseIcon  /> </div>
      </div>
    )
}
