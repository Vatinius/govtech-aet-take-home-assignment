import React, { useState, useEffect } from 'react';
import { makeMove } from '../services/GameSessionService';
import { Button } from 'react-bootstrap';

const GameBoard = ({ sessionId, player }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [gameSession, setGameSession] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Game in progress');
  const [preferredTile, setPreferredTile] = useState('');
  const [inputPosition, setInputPosition] = useState('');

  const fetchGameSession = async () => {
    try {
      // Fetch the latest game session data
      const response = await fetch(
        `http://localhost:3001/api/game-session/game-data/${sessionId}`
      );
      const data = await response.json();
      setGameSession(data);

      // Update the board
      const newBoard = Array(9).fill(null);
      data.moves.forEach((move) => {
        newBoard[move.position] = move.player;
      });
      setBoard(newBoard);

      // Update the status message
      if (!data.isActive) {
        if (data.winner === 'Draw') {
          setStatusMessage('The game is a draw');
        } else {
          setStatusMessage(`Player ${data.winner} wins!`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGameSession();

    // Polling to update the board every few seconds
    const interval = setInterval(() => {
      fetchGameSession();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = async (index) => {
    if (board[index] || !gameSession.isActive) return;

    setIsLoading(true);
    try {
      await makeMove(sessionId, player, index);
      await fetchGameSession();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const index = parseInt(inputPosition) - 1;
    if (isNaN(index) || index < 0 || index > 8) {
      alert('Please enter a valid tile number (1-9).');
      return;
    }
    if (board[index] || !gameSession.isActive || isLoading) {
      alert('This tile is already taken or the game is over.');
      return;
    }

    await handleClick(index);
    setInputPosition('');
  };

  return (
    <>
      <div>
        <div role="status" aria-live="polite">
          {statusMessage}
          <p>Session ID: {sessionId}</p>
          <p>Your Character: {player}</p>
          <p>How to play: Click a square you would like to occupy. If you occupy 3 squares in a row, you win!</p>
        </div>
        <div
        role="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridGap: '5px',
          marginTop: '20px',
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            role="gridcell"
            aria-label={`Cell ${index + 1}, ${cell ? `occupied by ${cell}` : 'empty'}`}
            onClick={() => handleClick(index)}
            disabled={!!cell || !gameSession?.isActive || isLoading}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '2em',
              position: 'relative',
            }}
          >
            {cell}
            {!cell && (
              <span
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  fontSize: '0.8em',
                  color: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                {index + 1}
              </span>
            )}
          </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Alternatively, enter the tile number you want to occupy below</p>
        <label htmlFor="tile-input">Enter tile number (1-9): </label>
        <input
          id="tile-input"
          type="number"
          min="1"
          max="9"
          value={inputPosition}
          onChange={(e) => setInputPosition(e.target.value)}
          disabled={!gameSession?.isActive || isLoading}
          style={{ width: '200px' }}
        />
        <button onClick={handleSubmit} disabled={!gameSession?.isActive || isLoading}>
          Confirm Move
        </button>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Button href="/home">Back to Home</Button>
      </div>
    </>
  );
};

export default GameBoard;
