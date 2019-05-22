import React, { Component, Fragment } from 'react';
import '../index.css';
import Square from './square.js';

export default class FallenSoldier extends Component {
  renderSquare(square, i, squareShade) {
    return <Square piece={square} style={square.style} />;
  }

  render() {
    return (
      <Fragment>
        <div className="board-row">
          {this.props.whiteFallenSoldiers.map((whiteSquare, index) =>
            this.renderSquare(whiteSquare, index)
          )}
        </div>

        <div className="board-row">
          {this.props.blackFallenSoldiers.map((blackSquare, index) =>
            this.renderSquare(blackSquare, index)
          )}
        </div>
      </Fragment>
    );
  }
}
