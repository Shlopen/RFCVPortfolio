import { useState } from "react";
import "./styles.css";

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2], //Top row
    [3, 4, 5], //Middle row
    [6, 7, 8], //Bottom row
    [0, 3, 6], //Left colum
    [1, 4, 7], //Middle colum
    [2, 5, 8], //Right colum
    [0, 4, 8], //Main diagonal
    [2, 4, 6] //Secondary diagonal
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function CheckTie(squares, squaresFull) {
  //Tied Game condition: All squares[i] are full and there is no winnes;
  for (let i = 1; i < squares.length; i++) {
    if (squares[i] !== null && squaresFull !== 8 && !CalculateWinner(squares)) {
      squaresFull++;
    }
    if (squaresFull === 8) {
      return true;
    }
  }
  return false;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function GameBoard() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  let status;
  let squaresFull = 0;

  const winner = CalculateWinner(squares);
  const tie = CheckTie(squares, squaresFull);

  if (winner) {
    status = "Player " + winner + " wins!";
  } else if (xIsNext === true) {
    status = "Player X's turn";
  } else if (xIsNext === false) {
    status = "Player O's turn";
  }
  if (tie === true) {
    status = "It's a tie!";
  }

  function HandleClick(i) {
    // i = index, meaning the square that it was clicked.
    if (squares[i] != null || CalculateWinner(squares)) {
      return null;
    }
    const nextSquares = squares.slice(); //Returns a shallow copy of the squares array.
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares); //setSquares forces a re-render of the components that use the square state.
    setXIsNext(!xIsNext);
  }

  function ResetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    squaresFull = 0;
  }

  function playForMe() {
    let available = []; //Array to store available squares to play.
    let flag = false;
    for (let i = 0; i < squares.length; i++) {
      //Loop through squares array and push each empty square indexes into available array.
      if (squares[i] === null) {
        available.push(i);
      }
    }
    while (
      CalculateWinner(squares) === null &&
      CheckTie(squares, squaresFull) === false &&
      flag === false
    ) {
      let n = Math.floor(Math.random() * 9); //Generate a random number between 0 and 8.
      if (available.includes(n)) {
        //If the generated number index is avaiable, play it and stop the loop. Otherwise, generate a new number.
        flag = true;
        HandleClick(n);
      }
    }
  }

  return (
    <>
      <h1>{status}</h1>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={function () {
            return HandleClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onSquareClick={function () {
            return HandleClick(1);
          }}
        />
        <Square
          value={squares[2]}
          onSquareClick={function () {
            return HandleClick(2);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={function () {
            return HandleClick(3);
          }}
        />
        <Square
          value={squares[4]}
          onSquareClick={function () {
            return HandleClick(4);
          }}
        />
        <Square
          value={squares[5]}
          onSquareClick={function () {
            return HandleClick(5);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={function () {
            return HandleClick(6);
          }}
        />
        <Square
          value={squares[7]}
          onSquareClick={function () {
            return HandleClick(7);
          }}
        />
        <Square
          value={squares[8]}
          onSquareClick={function () {
            return HandleClick(8);
          }}
        />
      </div>
      <div className="board-footer">
        <button className="footer-button" onClick={playForMe}>
          Play for me
        </button>
        <button className="footer-button" onClick={ResetGame}>
          Reset game
        </button>
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}
