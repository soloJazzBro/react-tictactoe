import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as helpers from './scripts/helpers.js';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: false
    };
  }
  
  handleClickSquare(i) {
    if(!this.state.winner){
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    } 
  }

  handleClickReset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: false
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClickSquare(i)}
      />
    );
  }

  renderReset() {
    return (
      <button 
        className="reset-btn"
        onClick={() => this.handleClickReset()}
      >RESET</button>
    );
  }

  render() {

    const winner = helpers.calculateWinner(this.state.squares.slice());
    let status;

    if (winner !== null) {
      status = 'Winner: ' + winner;
      this.setState({
        winner: true
      });
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-reset">
          {this.renderReset()}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
