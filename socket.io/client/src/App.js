import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [receiveMessage, setReceiveMessage] = useState('');
  const [room, setRoom] = useState('');

  function sendMessage() {
    socket.emit('send_message', { message, room });
  }

  function joinRoom() {
    socket.emit('join_room', room);
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setReceiveMessage(data);
    });
  }, [socket]);

  return (
    <div className="App">
      <div className="container">
        <input
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}> Send message</button>
        <input
          placeholder="Select room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}> Room</button>
        <h1>Message:</h1>
        {receiveMessage}
      </div>
    </div>
  );
}

export default App;
