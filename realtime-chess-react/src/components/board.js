import React, { Component, Fragment } from 'react';

import '../index';
import Square from './square';

const LIGHT_SQUARE_STYLE = "light-square";
const DARK_SQUARE_STYLE = "dark-square";
const BOARD_ROW_STYLE = "board-row";

export default class Board extends Component {
    renderSquare(i, squareShade) {
        return <Square 
            piece = {this.props.squares[i]}
            style = {this.props.squares[i] ? this.props.squares[i].style : null}
            shade = {squareShade}
            onClick = {() => this.props.onClick(i)}
        />
    }

    render() {
        const board = [];

        for (let i = 0; i < 8; i++) {
            const squareRows = [];

            for (let j = 0; j < 8; j++) {
                const bothEven = isEven(i) && isEven(j);
                const bothOdd = !isEven(i) && !isEven(j);
                
                const squareShade =
                    bothEven || bothOdd
                    ? LIGHT_SQUARE_STYLE
                    : DARK_SQUARE_STYLE;

                squareRows.push(this.renderSquare((i * 8) + j, squareShade));
            }

            board.push(
                <div className={BOARD_ROW_STYLE}>{squareRows}</div>
            )
        }

        return (
            <Fragment>
                {board}
            </Fragment>
        )
    }
}

function isEven(num) {
    return num % 2 === 0;
}