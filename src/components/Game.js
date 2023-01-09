import React from 'react';

import { Board } from "./Board";
import { calculateWinner } from '../utils/calculateWinner';

const [playerOneMark, playerTwoMark] = ['X', 'O'];

export class Game extends React.Component {
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