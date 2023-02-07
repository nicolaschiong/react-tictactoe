import React, { useState } from "react"
import ReactDOM from "react-dom"

const rowStyle = {
  display: "flex",
}

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  cursor: "pointer",
}

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
}

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
}

function Square() {
  return <div className="square" style={squareStyle}></div>
}

const initialSquares = Array(9).fill(null)

function Board() {
  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setXisNext] = useState(true)

  const handleClick = (index) => {
    const newSquares = [...squares]
    if (newSquares[index] || calculateWinner(newSquares)) {
      return
    }
    newSquares[index] = xIsNext ? "X" : "O"
    setSquares(newSquares)
    setXisNext(!xIsNext)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(squares)
  const status = winner ? winner : `${xIsNext ? "X" : "O"}`

  const renderSquare = (index) => {
    return (
      <button
        className="square"
        style={squareStyle}
        onClick={() => handleClick(index)}
      >
        {squares[index]}
      </button>
    )
  }

  const handleReset = () => {
    setSquares(initialSquares)
    setXisNext(true)
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        <span>{winner ? "" : "Next player: " + status}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner ? status : "None"}</span>
      </div>

      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>

      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

ReactDOM.render(<Game />, document.getElementById("root"))
