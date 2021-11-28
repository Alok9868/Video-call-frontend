import React ,{useState} from 'react'
import * as WebRTCHandler from '../../utils/WebRTCHandler';
import VideocamIcon from '@mui/icons-material/Videocam';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Tooltip from '@mui/material/Tooltip';
import { connect } from 'react-redux'
 function CameraButton({connectOnlyWithVideo}) {
    const [isLocalVideoDisabled,setIsLocalVideoDisabled]=useState(!connectOnlyWithVideo);
    function handleVideoButtonPressed() {
        WebRTCHandler.toggleVideo(isLocalVideoDisabled);
        setIsLocalVideoDisabled(!isLocalVideoDisabled)
    }

    return (
        <div 
        className="video_button_container"
        onClick={handleVideoButtonPressed}
        >
        {
            isLocalVideoDisabled ?
            <Tooltip title="Camera on" placement="top">
                        <NoPhotographyIcon className="cursor"/>
                    </Tooltip> 
              : 
              <Tooltip title="Camera off" placement="top">
                        <PhotoCameraIcon className="cursor"/>
                    </Tooltip> 
             
        }
            {/* <img 
                src={isLocalVideoDisabled ? CameraButtonOffImg :CameraButtonImg }
                alt="VideoSection"
                className="video_button_image"
                
            /> */}
        </div>
    )
}
const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}
export default connect(mapStoreStateToProps)(CameraButton);