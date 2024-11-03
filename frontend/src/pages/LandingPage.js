import React from "react";
import './LandingPage.css';
import ticTacToeImage from '../images/Tic Tac Toe.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function LandingPage() {
  return (
    <>
      <div className="LandingPage">
        <h1>Tic Tac Toe!</h1>
        <p>Choose from the available games!</p>
      </div>
      <div className="GameSelection" style={{ display: 'flex', gap: '1rem' }}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="top" src={ticTacToeImage} />
            <Card.Title>Game 1</Card.Title>
            <Card.Text>
              This is a game of Tic Tac Toe.
            </Card.Text>
            <Button variant="primary" href="/GameOne">Play</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="top" src={ticTacToeImage} />
            <Card.Title>Game 2</Card.Title>
            <Card.Text>
              This is a game of Tic Tac Toe.
            </Card.Text>
            <Button variant="primary" href="/GameTwo">Play</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="top" src={ticTacToeImage} />
            <Card.Title>Game 3</Card.Title>
            <Card.Text>
              This is a game of Tic Tac Toe.
            </Card.Text>
            <Button variant="primary" href="/GameThree">Play</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}