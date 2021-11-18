import React ,{useEffect} from 'react'
import './IntroductionPage.css'
import ConnectingButtons from './ConnectingButtons'
import {connect} from 'react-redux'
import {setIsRoomHost} from '../store/actions'
 function IntroductionPage({setIsRoomHostAction}) {
     useEffect(() => {
        setIsRoomHostAction(false);
     }, [])
    return (
        <div className="introduction_page_container">
            <div className="introduction_page_panel">
                <img 
                src="https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg" 
                alt="video call " 
                className="introduction_page_image"></img>
               <ConnectingButtons />
            </div>
        </div>
    )
}
const mapActionsToProps = (dispatch)=>{
    return {
        setIsRoomHostAction: (isRoomHost)=>dispatch(setIsRoomHost(isRoomHost))
    }
}
export default connect (null, mapActionsToProps)(IntroductionPage)
