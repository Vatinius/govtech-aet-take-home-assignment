import React, { useState } from 'react';
import GameBoard from '../components/GameBoard';
import { createGameSession } from '../services/GameSessionService';

const GameOne = () => {
  const [sessionId, setSessionId] = useState('');
  const [player, setPlayer] = useState('');
  const [joined, setJoined] = useState(false);

  const [newSessionName, setNewSessionName] = useState('');
  const [preferredPlayer, setPreferredPlayer] = useState('');

  const handleJoin = () => {
    if (sessionId && player) {
      setJoined(true);
    } else {
      alert('Please enter session ID and player symbol (X or O).');
    }
  };

  const handleCreate = async () => {
    if (newSessionName && preferredPlayer && (preferredPlayer === 'X' || preferredPlayer === 'O')) {
        try {
          const gameSession = await createGameSession(newSessionName, [preferredPlayer]);
          setSessionId(gameSession._id);
          setPlayer(preferredPlayer);
          setJoined(true);
        } catch (error) {
          console.error('Error creating game session:', error);
          alert('Failed to create game session.');
        }
      } else {
        alert('Please enter a session name and choose your player symbol (X or O).');
      }
  };

return (
    <div>
        {!joined ? (
            <div>
            <h2>Join a Game</h2>
            <input
              type="text"
              placeholder="Session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Player (X or O)"
              value={player}
              onChange={(e) => setPlayer(e.target.value.toUpperCase())}
            />
            <button onClick={handleJoin}>Join Game</button>
  
            <hr />
  
            <h2>Create a New Game</h2>
            <input
              type="text"
              placeholder="Session Name"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Symbol (X or O)"
              value={preferredPlayer}
              onChange={(e) => setPreferredPlayer(e.target.value.toUpperCase())}
            />
            <button onClick={handleCreate}>Create Game</button>
          </div>
        ) : (
            <GameBoard sessionId={sessionId} player={player} />
        )}
    </div>
);
};

export default GameOne;
