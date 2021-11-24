import React from 'react'
import VideoButtons from './VideoButtons'
import  SingleVideo from './SingleVideo'
import styled from "styled-components";
const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;


export default function VideoSection({streams,socketId}) {
    return (
        <div className="video_section_container">
        <Container>
        {
            streams.map((stream) => 
               <SingleVideo 
                stream={stream}
                key={stream.socketId}
                socketId={socketId}
               />
            )
        }
        </Container>
            {/* <SingleVideo /> */}
            <VideoButtons />
        </div>
    )
}
