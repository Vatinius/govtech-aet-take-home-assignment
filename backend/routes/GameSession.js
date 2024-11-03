const express = require('express');
const router = express.Router();
const GameSession = require('../models/GameSession');

router.get('/status', (req, res) => {
  console.log('API is functioning');
  res.send('API is functioning');
});

// Create a new game session
router.post('/create', async (req, res) => {
  try {
    res.send('Creating a new game session');
    const { sessionName, players } = req.body;
    const gameSession = new GameSession({ sessionName, players });
    await gameSession.save();
    res.json(gameSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Record a move
router.post('/move', async (req, res) => {
  try {
    const { sessionId, player, position } = req.body;
    const gameSession = await GameSession.findById(sessionId);

    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }

    if (!gameSession.isActive) {
      return res.status(400).json({ message: 'Game is not active' });
    }

    // Check if the position is already taken
    if (gameSession.moves.some((move) => move.position === position)) {
      return res.status(400).json({ message: 'Position already taken' });
    }

    // Record the move
    gameSession.moves.push({ player, position });

    // Check for a winner
    const winner = checkWinner(gameSession.moves);
    if (winner) {
      gameSession.isActive = false;
      gameSession.winner = winner;
    }

    // If all positions are filled, end the game as a draw
    if (gameSession.moves.length >= 9 && !winner) {
      gameSession.isActive = false;
      gameSession.winner = 'Draw';
    }

    await gameSession.save();
    res.json(gameSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve past games
router.get('/past-games', async (req, res) => {
  try {
    const games = await GameSession.find({ isActive: false });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to check for a winner
function checkWinner(moves) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playerMoves = { X: [], O: [] };

  moves.forEach((move) => {
    playerMoves[move.player].push(move.position);
  });

  for (const combination of winningCombinations) {
    if (combination.every((pos) => playerMoves['X'].includes(pos))) {
      return 'X';
    }
    if (combination.every((pos) => playerMoves['O'].includes(pos))) {
      return 'O';
    }
  }

  return null;
}

module.exports = router;
