import React ,{useEffect} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import NoURL from './NoURL'
import IntroductionPage from './IntroductionPage/IntroductionPage';
import RoomPage from './RoomPage/RoomPage'
import JoinRoomPage from './JoinRoom/JoinRoomPage'
import { connectWithSocketIOServer } from './utils/wss';
import './App.css';
import Login from './Login/Login'

function App() {
  useEffect(() => {;
    connectWithSocketIOServer();
  },[])
  return (
    <div className="App">
      <div>
        <Routes>
          {/* <Route exact path="/" element={<IntroductionPage />} />
          <Route exact path="/room" element={<RoomPage />} />
          <Route  path="/join-room" element={<JoinRoomPage />} />
          <Route path="*" element={<NoURL />} /> */}
          {/* trial period not to join */}
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<IntroductionPage />} />
          <Route exact path="/room" element={<RoomPage />} />
          <Route  path="/join-room" element={<JoinRoomPage />} />
          <Route path="*" element={<NoURL />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
