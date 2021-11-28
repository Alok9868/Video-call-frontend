import React from "react";
import { useState, useEffect } from "react";

const Timer = (props) => {
  const {setAlarm } = props;
  const [showInput,setShowInput]=useState(true);
  const [minutes, setMinutes] = useState(-1);
  const [seconds, setSeconds] = useState(-1);
  const [min,setMin]=useState(-1);
  const [sec,setSec]=useState(-1);
  function startTimer(){
    setMinutes(min);
    setSeconds(sec);
    setShowInput(false);
  }
//   function startTimer(){
//     let myInterval = setInterval(() => {
//         if (seconds > 0) {
//           setSeconds(seconds - 1);
//         }
//         if (seconds === 0) {
//           if (minutes === 0) {
//             alert("meeting over");
//             clearInterval(myInterval);
//           } else {
//             setMinutes(minutes - 1);
//             setSeconds(59);
//           }
//         }
//       }, 1000);
//     //   return ()=> {
//     //     clearInterval(myInterval);
//     //   };
//   }
  useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0 ) {
                if (minutes === 0 || minutes ==='00') {
                    setAlarm(false);
                    alert("meeting over");
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

  return (
    <div>
    { showInput ? <>
    <input type="text"  onChange={(e)=>{setMin(e.target.value)}} placeholder="Enter minutes"/>
    <input type="text" onChange={(e)=>{setSec(e.target.value)}} placeholder="Enter seconds"/>
    <button onClick={startTimer}>Submit</button>
    <button onClick={()=>{setAlarm(false)} } >Close</button>
    </>
    : " "}
    
      {(minutes === 0 || minutes===-1) &&( seconds === 0 || seconds===-1 ) ? null : (
        <h1>
          {" "}
          {minutes}:{seconds}
          {/* seconds < 10 ? `0${seconds}` : seconds */}
        </h1>
      )}
    </div>
  );
};

export default Timer;
