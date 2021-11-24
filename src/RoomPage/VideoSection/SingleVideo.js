import React ,{useEffect ,useRef} from 'react'

import styled from "styled-components";
const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;
export default function SingleVideo({stream,socketId}) {
    const ref=useRef(null);
    useEffect(() =>{
        ref.current.srcObject = stream.stream;
    });
    const flag=stream.socketId === socketId;
    return (
        <StyledVideo 
        playsInline 
        autoPlay 
        ref={ref}
        muted={flag}
        >
            {/* <video src={url} autoPlay={true}  playsInline controls={false}></video> */}
        </StyledVideo>
    )
}
