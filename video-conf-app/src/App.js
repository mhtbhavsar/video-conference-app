import React, { useEffect, useState } from 'react';
import {
  LiveKitRoom,
  VideoConference,
  useToken,
} from '@livekit/components-react';
import '@livekit/components-styles';

import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(null);
  const [livekitUrl, setLivekitUrl] = useState(null);
  const [userName, setUserName] = useState('');
  const roomName = 'demo-room';

  const joinRoom = async () => {
    const randomUser = 'user-' + Math.floor(Math.random() * 1000);
    setUserName(randomUser);

    const res = await axios.post('http://localhost:3001/get-token', {
      roomName,
      userName: randomUser,
    });

    setToken(res.data.token);
    setLivekitUrl(res.data.livekiUrl);
  };

  const leaveRoom = () => {
    setToken(null);
    setUserName('');
  };

  return (
    <div>
      {!token ? (
        <div style={{ padding: 20 }}>
          <h2>LiveKit Meet</h2>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <LiveKitRoom
          token={token}
          serverUrl={livekitUrl != null ? livekitUrl : "wss://testapp-u1p5bavr.livekit.cloud"}
          connect={true}
          onDisconnected={leaveRoom}
          data-lk-theme="default"
          style={{ height: '100vh' }}
        >
          <VideoConference />
        </LiveKitRoom>
      )}
    </div>
  );
};
export default App;
