import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './DeckUpdates.css';

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
    <div className="deck-updates-container">
      <h1 className="title">Deck Updates</h1>
      <ul className="updates-list">
        {updates.map((update, index) => (
          <li key={index} className="update-item">
            <span>Deck <strong>{update.deck?.name || 'Desconhecido'}</strong> foi importado com sucesso!</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeckUpdates;
