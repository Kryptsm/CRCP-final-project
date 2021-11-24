import React from 'react';
import './Game.css';
import './App.js';
import { initializeSounds } from './App.js';

import magicIcon from "./images/targetOff.png";
import blasterIcon from "./images/boxesOff.png";
import radioIcon from "./images/new-icons/jerry_off.png";
import ambientIcon from "./images/new-icons/sad_elaine_off.png";
import borealisIcon from "./images/new-icons/kramer_off.png";
import marioIcon from "./images/new-icons/happy_george_off.png";
import organIcon from "./images/new-icons/angry_george_off.png";
import R2D2Icon from "./images/new-icons/disgusted_elaine_off.png";
import bubblesIcon from "./images/empty.png";

var imagesArray = [magicIcon, blasterIcon, radioIcon, ambientIcon,
    borealisIcon, marioIcon, organIcon, R2D2Icon, bubblesIcon];

function Square(props) {
    if (props.value !== null) {
        return (
            <img className="square" onClick={props.onClick} src={imagesArray[props.value - 1]} alt={props.value} id={props.value - 1}>
            </img>
        );
    }
    else {
        return (
            <img className="square" onClick={props.onClick} src={imagesArray[8]} id="empty" alt="empty">
                {props.value}
            </img>
        );
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [[1, 2, 3], [4, 5, 6], [7, 8, null]],
            xIsNext: true,
            justClicked: 9,
        };
    }

    handleClick(x, y) {
        const squares = this.state.squares.slice();
        const temp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

        var found = false;
        var nullX = -1;
        var nullY = -1;

        for (var yCounter = 0; yCounter < 3; yCounter++) {
            for (var xCounter = 0; xCounter < 3; xCounter++) {
                if (squares[yCounter][xCounter] == null) {
                    nullX = xCounter;
                    nullY = yCounter;
                    found = true;
                }
                if (found)
                    break;
            }
            if (found)
                break;
        }

        var isNeighbor = false;

        if ((nullX + 1 === x) && (nullY === y))
            isNeighbor = true;
        else if ((nullX - 1 === x) && (nullY === y))
            isNeighbor = true;
        else if ((nullX === x) && (nullY + 1 === y))
            isNeighbor = true;
        else if ((nullX === x) && (nullY - 1 === y))
            isNeighbor = true;

        if (isNeighbor) {
            var tempHolder = squares[y][x];
            squares[y][x] = null;
            squares[nullY][nullX] = tempHolder;
            this.setState({
                justClicked: temp[y][x] + 1,
            }, initializeSounds(temp[y][x]))
        }

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(x, y) {
        return (
            <Square
                value={this.state.squares[y][x]}
                onClick={() => this.handleClick(x, y)}
                justClicked={this.state.justClicked}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(2, 0)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(2, 1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game m-3" id="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

export default Game;
