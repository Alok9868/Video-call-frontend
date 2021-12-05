import React, { useState } from 'react';
import RecordRTC from 'recordrtc';
import { saveAs } from 'file-saver';
import './recording.css';
import VideocamIcon from '@mui/icons-material/Videocam';
import Tooltip from '@mui/material/Tooltip';

let recorder;
let localstream, localaudio;
export default function ScreenRecording() {

  const [show, setShow] = useState(false);
  const [showblink,setShowblink] = useState(false);
  async function startRecording() {

    await navigator.mediaDevices.getDisplayMedia({
      video: {
        // cursor: 'never',
        // displaySurface: 'monitor',
        aspectRatio: 1.7777777777777777,
        frameRate: 90,
        height: 1080,
        // logicalSurface: true,
        // resizeMode: "crop-and-scale",
        width: 1920,
        facingMode: "user" 
      },
      audio: {
        echoCancellation: true,
        sampleRate: 100,
        volume: 1.0,
        restrictOwnAudio:true,
        noiseSuppression: true,
        autoGainControl: true,
      }
    }).then(async function (stream) {
      // {'echoCancellation': true}
      navigator.mediaDevices.getUserMedia({ 'audio': true, }).then((audio) => {

        localstream = stream;
        localaudio = audio;

        screenRecording(stream, audio);
        add();
      })
        .catch((err) => {
          console.log('error in accessing microphone: ' + err);
          screenRecording(stream);
        })
    })
    .catch((err) => {
      console.log('====================================');
      console.log('error',err);
      console.log('====================================');
    })

  }


  function screenRecording(stream, audio = null) {
    if (audio) {
      recorder = RecordRTC([stream, audio], {
        type: 'video',
        bitsPerSecond: 128000,
        timeSlice: 1000,
        disableLogs: true,
        frameInterval: 90,
        video: { width: 3840, height: 2160 },
        sampleRate: 96000,

        // used by StereoAudioRecorder
        // the range 22050 to 96000.
        // let us force 16khz recording:
        desiredSampRate: 16000,

        // used by StereoAudioRecorder
        // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
        bufferSize: 16384,

        // used by StereoAudioRecorder
        // 1 or 2
        numberOfAudioChannels: 2,

        // used by WebAssemblyRecorder
        frameRate: 120,

        // used by WebAssemblyRecorder
        bitrate: 128000,

        // used by MultiStreamRecorder - to access HTMLCanvasElement
        // elementClass: 'multi-streams-mixer'
      });


    }

    else {
      recorder = RecordRTC([stream], {
        type: 'video',
        bitsPerSecond: 128000,
        frameInterval: 90,
        video: { width: 3840, height: 2160 },
        sampleRate: 96000,

        // used by StereoAudioRecorder
        // the range 22050 to 96000.
        // let us force 16khz recording:
        desiredSampRate: 16000,

        // used by StereoAudioRecorder
        // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
        bufferSize: 16384,

        // used by StereoAudioRecorder
        // 1 or 2
        numberOfAudioChannels: 2,

        // used by WebAssemblyRecorder
        frameRate: 60,

        // used by WebAssemblyRecorder
        bitrate: 128000,

        // used by MultiStreamRecorder - to access HTMLCanvasElement
        // elementClass: 'multi-streams-mixer'
      });

    }

    recorder.startRecording();
    setShow(true);
    stream.getVideoTracks()[0].onended = function () {
      stopRecording();
      setShow(false);
      setShowblink(false)
    };

    // stream.getTracks().forEach((track) => {
    //   track.addEventListener('ended', () => {
    //     stopRecording();
    //   }, false);
    //   track.addEventListener('inactive', () => {
    //    console.log('inactive');
    //    stopRecording();
    //   }, false);
    // });

  }
  function add(){
    setShowblink(!showblink);
  }

  function stopRecording() {
    localstream.getTracks().forEach((t) => t.stop());
    localaudio.getTracks().forEach((t) => t.stop());

    const getFileName = (fileExtension) => {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var date = d.getDate();
      return 'ScreenRecord-' + year + month + date + ' .' + fileExtension;
    }
    recorder.stopRecording(function () {
      let recorderBlob = recorder.getBlob();
      if (recorderBlob) {
        var blob = recorderBlob;
        saveAs(blob, getFileName('mp4'));
      }
    });
    add();
    setShow(false);

  }
  function handleClickScreenRecording(){
    if(!showblink){
      startRecording();
    }
    else{
      stopRecording();
    }
  }



  // className={`${showblink ? "blink-red-circle  " : " " }`}
  return  <div  className="recording-icon" >
  
   
    {/* <button onClick={startRecording}
    > Start Recording</button>
    <button onClick={stopRecording}
    >StopRecording</button>
    */}
    <div className= {` ${ showblink ? "blink-red-circle" : ""}`}></div>
    <Tooltip title="screen-recording" placement="top" >
    <VideocamIcon 
    onClick={handleClickScreenRecording }

      />
    </Tooltip>
    {/* <Button variant="contained" onClick={startRecording} className="record-screen" >Start Recording</Button> */}
    {/* <Button variant="contained" onClick={stopRecording} className="record-screen">Stop Recording</Button> */}
    {/* {show ?<VideocamOffIcon onClick={stopRecording} className="record-screen-on recording-icon" />: " "} */}
  </div>
  
}