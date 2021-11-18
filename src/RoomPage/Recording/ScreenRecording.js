import React, { useState } from 'react';
import RecordRTC from 'recordrtc';
import { saveAs } from 'file-saver';
let recorder;
let localstream, localaudio;
export default function ScreenRecording() {

  const [show, setShow] = useState(false);
  async function startRecording() {
    await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    }).then(async function (stream) {

      // {'echoCancellation': true}
      navigator.mediaDevices.getUserMedia({ 'audio': true, }).then((audio) => {

        localstream = stream;
        localaudio = audio;

        screenRecording(stream, audio);
      })
        .catch((err) => {
          console.log('error in accessing microphone: ' + err);
          screenRecording(stream);
        })
    });

  }


  function screenRecording(stream, audio = null) {
    if (audio) {
      console.log(stream, audio);
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
      console.log(stream, audio);
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
        // var file = new File([blob], getFileName('mp4'), {
        //   type: 'video/mp4'
        // });
        // RecordRTC.invokeSaveAsDialog(file);
        saveAs(blob, getFileName('mp4'));
      }
    });
    setShow(false);

  }



  return <div>
    <button onClick={startRecording}
    > Start Recording</button>
    {show ? <button onClick={stopRecording}
    >StopRecording</button> : " "}
  </div>
}