import React, { Component, Fragment } from 'react';

import '../index.css';
import Board from './board';
import FallenSoldier from './fallenSoldier';
import initializeBoard from '../helpers/initialise';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      squares: initializeBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white',
    };
  }

  handleClick(i) {
    const { sourceSelection, player } = this.state;

    // Get a shallow copy of the array
    const squares = this.state.squares.slice();
    const square = squares[i];

    if (sourceSelection === -1) {
      if (!square || square.player !== player) {
        this.setState({
          status: `Wrong selection. Choose ${player} player's pieces`,
        });

        if (squares[i]) {
            delete squares[i].style.backgroundColor;
        }

      } else {
        squares[i].style = {
          ...squares[i].style,
          backgroundColor: 'RGB(111,115,210)  ',
        };

        this.setState({
          status: 'Choose destination for the selected piece',
          sourceSelection: i,
        });
      }
    } else if (sourceSelection > -1) {
      if (squares[sourceSelection].style.backgroundColor) {
        // console.log(squares[sourceSelection]);
        // delete squares[sourceSelection].style.backgroundColor;
        // squares[sourceSelection].style.backgroundColor = undefined;
      }

      if (square && square.player === player) {
        this.setState({
          status: 'Wrong selection. Choose valid source and destination :)',
          sourceSelection: -1,
        });
      } else {
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
        const squareIsEmpty = square ? true : false;
        const isMovePossible = squares[sourceSelection].isMovePossible(
          sourceSelection,
          i,
          squareIsEmpty
        );
        const srcToDestPath = squares[sourceSelection].getSrcToDestPath(
          sourceSelection,
          i
        );
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if (isMovePossible && isMoveLegal) {
          if (square !== null) {
            if (square.player === 1) {
              whiteFallenSoldiers.push(square);
            } else {
              blackFallenSoldiers.push(square);
            }

            console.log('whiteFallenSoldiers: ', whiteFallenSoldiers);
            console.log('blackFallenSoldiers: ', blackFallenSoldiers);

            // Move piece
            squares[i] = squares[sourceSelection];
            squares[sourceSelection] = null;

            const nextPlayer = player === 1 ? 2 : 1;
            const turn = nextPlayer === 1 ? 'white' : 'black';

            this.setState({
              sourceSelection: -1,
              player: nextPlayer,
              status: '',
              squares,
              whiteFallenSoldiers,
              blackFallenSoldiers,
              turn,
            });
          } else {
            this.setState({
              status:
                'Wrong selection. Choose valid source and destination again',
              sourceSelection: -1,
            });
          }
        }
      }
    }
  }

  isMoveLegal(srcToDestPath) {
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        return false;
      }
    }

    return true;
  }

  render() {
    const {
      squares,
      turn,
      status,
      whiteFallenSoldiers,
      blackFallenSoldiers,
    } = this.state;

    return (
      <Fragment>
        <div className="game">
          <div className="game-board">
            <Board squares={squares} onClick={i => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: turn }} />
            <div className="game-status">{status}</div>
            <div className="fallen-soldier-block">
              {
                <FallenSoldier
                  whiteFallenSoldiers={whiteFallenSoldiers}
                  blackFallenSoldiers={blackFallenSoldiers}
                />
              }
            </div>
          </div>
        </div>

        <div className="icons-attribution">
          <div>
            <small>
              {' '}
              Chess Icons And Favicon (extracted) By en:User:Cburnett [
              <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>,{' '}
              <a href="http://creativecommons.org/licenses/by-sa/3.0/">
                CC-BY-SA-3.0
              </a>
              , <a href="http://opensource.org/licenses/bsd-license.php">BSD</a>{' '}
              or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>],{' '}
              <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">
                via Wikimedia Commons
              </a>{' '}
            </small>
          </div>
        </div>
      </Fragment>
    );
  }
}
