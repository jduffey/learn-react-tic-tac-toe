import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Square } from "./components/Square";

const [playerOneMark, playerTwoMark] = ['X', 'O'];

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                highlight={this.props.winningSquares?.includes(i)}
            />
        );
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            isPlayerOneNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // Make a copy of the data instead of mutating it

        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }

        squares[i] = this.state.isPlayerOneNext ? playerOneMark : playerTwoMark;
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            isPlayerOneNext: !this.state.isPlayerOneNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isPlayerOneNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winningData = calculateWinner(current.squares);

        const moves = history.map((_, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        })

        let status;
        if (winningData?.winner) {
            status = 'Winner: ' + winningData.winner;
        } else {
            status = 'Next player: ' + (this.state.isPlayerOneNext ? playerOneMark : playerTwoMark);
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winningSquares={winningData?.winningSquares}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol start="0">{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const winningConfigurations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningConfigurations.length; i++) {
        const [a, b, c] = winningConfigurations[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winningSquares: [a, b, c],
            };
        }
    }
    return {
        winner: null,
        winningSquares: null,
    };
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
