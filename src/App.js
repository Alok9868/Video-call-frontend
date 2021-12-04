import React, { useEffect } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import NoURL from './NoURL/NoURL.jsx'
import RoomPage from './RoomPage/RoomPage'
import JoinRoomPage from './JoinRoom/JoinRoomPage'
import { connectWithSocketIOServer } from './utils/wss';
import './App.css';
import Login from './Login/Login'
import Home from './Home/Home';
import End from './Endpage/Endpage.jsx';

function App() {
  useEffect(() => {
    connectWithSocketIOServer();
  }, [])
  return (
    <div className="App">
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/room" element={<RoomPage />} />
          <Route path="/join-room" element={<JoinRoomPage />} />
          <Route path="/end" element={<End />} />
          <Route path="*" element={<NoURL />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;


