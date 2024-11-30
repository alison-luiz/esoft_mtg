import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

function DeckUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('deckUpdate', (data) => {
      console.log('Update received:', data);
      setUpdates((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Deck Updates</h1>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>{JSON.stringify(update)}</li>
        ))}
      </ul>
    </div>
  );
}

export default DeckUpdates;
