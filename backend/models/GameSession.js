const mongoose = require('mongoose');

const MoveSchema = new mongoose.Schema({
  player: String,
  position: Number,
});

const GameSessionSchema = new mongoose.Schema({
  sessionName: String,
  players: [String],
  moves: [MoveSchema],
  isActive: { type: Boolean, default: true },
  winner: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
