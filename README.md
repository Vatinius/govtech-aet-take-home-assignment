# govtech-aet-take-home-assignment

## Getting Started

Prerequisites
- Node.js and npm

Installation and Setup
1. Clone or download the following github repository: [Repo](https://github.com/Vatinius/govtech-aet-take-home-assignment)
2. Using your IDE of choice, open the repo. You should see two folders, `backend` and `frontend`, and a README.md file.
3. In the `backend` folder,
    1. Create a `.env` file and input the following data:
    ```
    MONGODB_URI="mongodb+srv://appUser:ilovetictactoe@cluster0.pidgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    PORT=3001
    ```
    2. Using a terminal, `cd` into backend folder and run `npm install`
4. In the `frontend` folder, using a terminal `cd` into the folder and run the command `npm install`
5. To start the backend server locally, using a terminal window, `cd` into the `backend` folder and run `node index.js`
    - If successful, you should see the message
    ```
    Server running on port 3001
    Connected to MongoDB Atlas
    ```
6. To start the frontend server, using another terminal window, `cd` into the folder and run the command `npm start`
7. Ensure both the frontend and backend are running.
8. Using Chrome browser, enter the url: `https://localhost:3000` to view the landing page.

### Starting or Joining a Game
1. On the landing page, click the `play` button, or go to `http://localhost:3000/GameMenu` on your browser. 
2. To create a new game:
    1. Enter a session name.
    2. Choose your symbol ("X" or "O).
    3. Click "Create Game"
    4 Note:
        - After creating the game, the game board will appear.
        - A unique automaticsession ID is automatically created; you can share the session ID with others to have them join your lobby.
3. To join a game:
    1. Enter the unique session ID into the appropriate input field.
    2. Choose the opposite Player Symbol ("X" or "O").
    3. Click "Join Game".

### Playing A Game
- Making a Move
    - You can make a move by:
        - Clicking on an empty tile on the game board.
        - Entering the tile number (1-9) in the input field below the board and clicking "Confirm Move".
- Game Progress
    - The game state updates in real-time, reflecting moves made by both players.
    - The status message indicates whose turn it is or if the game has ended.

### Playing On Multiple Browsers
- Simulate Two Players

    - Open the game in two different browsers or use incognito/private mode.
    - One player uses one browser window, and the other player uses the second window.
    - Both players can interact with the game simultaneously.
    
- Real-Time Updates
    - The game board updates every 1 seconds to reflect the latest moves.
    - Ensure both players have a stable internet connection for the best experience.

## Design Decisions
- Screen Reader Compatibility
    - Tested with VoiceOver on Mac and NVDA on Windows.
    - aria-live regions announce status updates (e.g., turn changes, game outcomes).
    - aria-labels on buttons and inputs provide descriptive information.
- Keyboard Navigation
    - All interactive elements are reachable via keyboard.
    - Users can tab through inputs and buttons.
    - Pressing Enter activates buttons.
- Alternative Input Methods
    - Users can make moves by entering the tile number, catering to those who may have difficulty clicking.
- Visual Enhancements
    - High-contrast color scheme improves visibility.
    - Translucent tile indices help users identify empty tiles without clutter.
- Feedback Mechanisms
    - Status messages inform users of game progress.
    - Alerts notify users of invalid inputs or errors.
- Testing Scenarios
    - Visual Impairments: Ensured the game is playable without relying solely on visual cues.
    - Motor Impairments: Provided alternative input methods for ease of use.
    - Cognitive Impairments: Kept the interface simple and instructions clear.

## API Specifications

1. Create Game Session
    - Endpoint: `/api/game-session/create`
    - Method: `POST`
    - Description: Creates a new game session.
    - Request Body:
        ```
        {
            "sessionName": "Test Game",
            "players": ["X"]
        }
        ```
    - Sample Request in Postman:
        - URL: `http://localhost:3001/api/game-session/create`
        - Headers: 
            - `Content-Type: application/json`
        - Body: (Raw JSON)
            ```
            {
                "sessionName": "My First Game",
                "players": ["X"]
            }
            ```
    - Sample Response:
        ```
        {
            "_id": "60b8d6f5e1a0c840d8f1e4b7",
            "sessionName": "My First Game",
            "players": ["X"],
            "moves": [],
            "isActive": true,
            "winner": null,
            "createdAt": "2021-06-03T14:55:49.647Z",
            "__v": 0
        }
        ```
2. Making A Move
    - Endpoint: `/api/game-session/move`
    - Method: `POST`
    - Description: Records a player's move.
    - Request Body:
        ```
        {
            "sessionId": "60b8d6f5e1a0c840d8f1e4b7",
            "player": "X",
            "position": 0
        }
        ```
    - Sample Request in Postman:
        - URL: `http://localhost:3001/api/game-session/move`
        - Headers:
            - `Content-Type: application/json`
        - Body: (Raw JSON)
            ```
            {
                "sessionId": "60b8d6f5e1a0c840d8f1e4b7",
                "player": "X",
                "position": 0
            }
            ```
    - Sample Response:
        ```
        {
            "_id": "60b8d6f5e1a0c840d8f1e4b7",
            "sessionName": "My First Game",
            "players": ["X"],
            "moves": [
                {
                "_id": "60b8d6f6e1a0c840d8f1e4b8",
                "player": "X",
                "position": 0
                }
            ],
            "isActive": true,
            "winner": null,
            "createdAt": "2021-06-03T14:55:49.647Z",
            "__v": 1
        }
        ```
3. Getting a Game Session by ID
    - Endpoint: `/api/game-session/:sessionId`
    - Method: `GET`
    - Description: Retrives a game session by its ID.
    - Sample Request in Postman:
        - URL: `http://localhost:3001/api/game-session/60b8d6f5e1a0c840d8f1e4b7`
    - Sample Response:
        ```
        {
            "_id": "60b8d6f5e1a0c840d8f1e4b7",
            "sessionName": "My First Game",
            "players": ["X"],
            "moves": [],
            "isActive": true,
            "winner": null,
            "createdAt": "2021-06-03T14:55:49.647Z",
            "__v": 0
        }
        ```

## Design and Accessibility Considerations
This application was designed with accessibility in mind to ensure that users with sensory impariments can enjoy the game of tic-tac-toe.

- Accessibile Compionents:
    - Utilized semantic HTML elements (<button>, <input>, <label>) to enhance screen reader compatibility.
    - Implemented `aria-live` regions to announce game status updates without interrupting the user's workflow.
- Alternative Input Methods:
    - Provided an input field to allow users to enter the tile number manually, catering to users who may have difficulty clicking or moving a mouse with precision.
- Visual ENhancements:
    - Displayed tile indices on empty tiles with a translucent style, aiding users in identifying tile positions without overwhelming the interface.
    - Ensured high-contrast color schemes and readable fonts to assist users with visual impairments.
- Keyboard Navigation:
    - Ensured all interactive elements are accessible via keyboard, allowing users to navigate and interact without a mouse.

## Architecture Diagram

- Frontend:
    - Built with React.js and React Router.
    - Runs on `localhost:3000` during development
    - Communicates with the backend via HTTP requests.
- Backend:
    - Built using Node.js.
    - Runs on `localhost:3001` during development.
    - Uses Mongoose for MongoDB interactions.
    - Provides RESTful API endpoints.
- Database:
    - MongoDB Atlas is used as a free cloudbase service.

- Diagram:

![alt text](<Architecture Diagram.jpeg>)