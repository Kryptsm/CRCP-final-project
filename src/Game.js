import React from 'react';
import './Game.css';
import './App.js';
import { initializeSounds } from './App.js';

import target from "./images/targetOff.png";
import boxes from "./images/boxesOff.png";
import seinfeld3 from "./images/seinfeld3.png";
import elaine from "./images/elaine.png";
import kramer from "./images/kramer.png";
import george from "./images/george.png";
import george2 from "./images/george2.png";
import elaine2 from "./images/elaine2.png";

import empty from "./images/lime.png";

var imagesArray = [target, boxes, seinfeld3, elaine, kramer, george, george2, elaine2];

function Square(props) {
    if(props.value !== null){
        return (
            <img className="square" onClick={props.onClick} src={imagesArray[props.value - 1]} alt={props.value}>
            </img>
        );
    }
    else{
        return (
            <img className="square" onClick={props.onClick} src={empty} id={props.value} alt="empty">
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
        };
    }

    handleClick(x, y) {
        const squares = this.state.squares.slice();
        const temp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

        var found = false;
        var nullX = -1;
        var nullY = -1;

        for(var yCounter = 0; yCounter < 3; yCounter++){
            for(var xCounter = 0; xCounter < 3; xCounter++){
                if(squares[yCounter][xCounter] == null){
                    nullX = xCounter;
                    nullY = yCounter;
                    found = true;
                }
                if(found)
                    break;
            }
            if(found)
                break;
        }

        var isNeighbor = false;

        if((nullX + 1 === x) && (nullY === y))
            isNeighbor = true;
        else if((nullX - 1 === x) && (nullY === y))
            isNeighbor = true;
        else if((nullX === x) && (nullY + 1 === y))
            isNeighbor = true;
        else if((nullX === x) && (nullY - 1 === y))
            isNeighbor = true;

        if(isNeighbor){
            var tempHolder = squares[y][x];
            squares[y][x] = null;
            squares[nullY][nullX] = tempHolder;
        }
        
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        }, initializeSounds(temp[y][x]));
    }

    renderSquare(x, y) {
        return (
            <Square
                value={this.state.squares[y][x]}
                onClick={() => this.handleClick(x, y)}
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
