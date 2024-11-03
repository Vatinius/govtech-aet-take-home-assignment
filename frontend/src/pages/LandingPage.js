import React from "react";
import './LandingPage.css';
import ticTacToeImage from '../images/Tic Tac Toe.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
            <Card.Title>Game Menu</Card.Title>
            <Card.Text>
              Join a game or create a new game session of Tic Tac Toe!
            </Card.Text>
            <Button variant="primary" href="/GameMenu">Play</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}