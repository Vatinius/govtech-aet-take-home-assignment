import axios from 'axios';

const API_URL = 'http://localhost:3001/api/game-session';

export const createGameSession = async (sessionName, players) => {
    const response = await axios.post(`${API_URL}/create`, {
        sessionName,
        players
    });
    return response.data;
};


export const makeMove = async (sessionId, player, position) => {
    try {
        const response = await axios.post(`${API_URL}/move`, {
          sessionId,
          player,
          position,
        });
        return response.data;
      } catch (error) {
        console.error('Error making move:', error.response ? error.response.data : error);
        throw error;
      }
}
