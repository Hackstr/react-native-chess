import React, { Component } from 'react';
import {
  Dimensions,
  Animated
} from 'react-native';
import Square from './Square';
import Piece from './Piece';
import CONSTANTS from './Constants';
import { reverseColor, getPosibleMoves } from './Helper';

const { width } = Dimensions.get('window');

const keys = [
            [0, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14, 15],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [16, 17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 30, 31]
          ];

class Board extends Component {

  constructor() {
    super();
    this.state = {
      selectedPiece: null,
    };
  }

  onPieceSelected(row, column, color, hasMoves) {
    if (this.state.selectedPiece !== null) {
      if (this.props.turn !== color) {
        this.onSquareSelected(row, column);
      } else {
        if (this.state.selectedPiece.row !== row || this.state.selectedPiece.column !== column) {
          //Reselect
          this.setSelectedPiece({ row, column, hasMoves });
        } else {
          //Unselect
          this.setSelectedPiece(null);
        }
      }
    } else {
      this.setSelectedPiece({ row, column, hasMoves });
    }
  }

  getPiece(row, column) {
    const t = CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[row];
    return this.props.game.get(t);
  }

  setSelectedPiece(piece) {
    this.setState({ selectedPiece: piece });
  }

  onPressEmptySquare(row, column) {
    this.setSelectedPiece(null);
  }

  onSquareSelected(row, column) {
    if (this.state.selectedPiece === null) {
      return;
    }

    this.movePiece(row, column);
  }

  //
  // getPosibleMoves() {
  //   this.state.selectedPiece !== null &&
  //               moves.indexOf(CONSTANTS.COLUMNS[column]
  //               + CONSTANTS.ROWS[rowIndex]) !== -1
  //
  //   if(this.state.selectedPiece) {
  //
  //   }
  // }

  makeRandomMove() {
    const possibleMoves = this.props.game.moves();

    // game over
    if (possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    this.props.game.move(possibleMoves[randomIndex]);
    this.props.turnComplete();
  }

  movePiece(row, column) {
    const move = {
      from: CONSTANTS.COLUMNS[this.state.selectedPiece.column]
          + CONSTANTS.ROWS[this.state.selectedPiece.row],
      to: CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[row],
      promotion: 'q',
    };

    const gameMove = this.props.game.move(move);

    if (gameMove) {
      keys[row][column] = keys[this.state.selectedPiece.row][this.state.selectedPiece.column];
      keys[this.state.selectedPiece.row][this.state.selectedPiece.column] = null;

      if(gameMove.captured) {
        const capturedPiece = { type: gameMove.captured, color: reverseColor(this.props.turn) };
        this.props.captureCallback(capturedPiece);
      }
    }

    this.props.turnComplete();

    if (this.props.twoPlayer) {
      this.makeRandomMove();
    }

    this.props.moveCallback(row, column);
  }

  getPieceTranfrom() {
    const degree = (this.props.isRotate) ? '180deg' : '0deg';
    return {
      transform: [
        { rotateX: degree },
      ]
    };
  }

  render() {
    const squares = [];
    const pieces = [];
    let moves = [];

    const currentColor = (this.props.twoPlayer) ? CONSTANTS.WHITE : this.props.turn;

    const gameState = this.props.game.fen().split(' ')[0].split('/');

    if (this.state.selectedPiece !== null) {
      moves = getPosibleMoves(this.props.game, this.state.selectedPiece.row, this.state.selectedPiece.column)
    }

    gameState.map((row, rowIndex) => {
      let column = 0;

      for (let i = 0; i < row.length; i++) {
        if (row.charAt(i).match(/\d/)) {
          for (let j = 0; j < parseInt(row.charAt(i)); j++) {
            squares.push(
              <Square
                column={column}
                row={rowIndex}
                isPiece = { false }
                selectable={this.state.selectedPiece !== null &&
                            moves.indexOf(CONSTANTS.COLUMNS[column]
                            + CONSTANTS.ROWS[rowIndex]) !== -1
                           }
                selected={false}
                key = { rowIndex + ' ' + i + '' + j }
                onSquareSelect={this.onSquareSelected.bind(this)}
                onPressEmptySquare={this.onPressEmptySquare.bind(this)}
              />
            );
            column++;
          }
        } else if (row.charAt(i).match(/[A-Za-z]/)) {
          squares.push(
            <Square
              column={column}
              row={rowIndex}
              isPiece = { true }
              selectable={this.state.selectedPiece !== null &&
                          moves.indexOf(CONSTANTS.COLUMNS[column]
                          + CONSTANTS.ROWS[rowIndex]) !== -1} //unuseles
              // selected={this.state.selectedPiece !== null &&
              //           this.state.selectedPiece.row === rowIndex &&
              //           this.state.selectedPiece.column === column}
              selectedPiece={this.state.selectedPiece}
              key = { rowIndex + ' ' + i + 'square'}
              onSquareSelect={this.onSquareSelected.bind(this)}
            />
          );
          const color = row.charAt(i).match(/[A-Z]/) ? CONSTANTS.WHITE : CONSTANTS.BLACK;

          pieces.push(
            <Piece
              piece={row.charAt(i).toLowerCase()}
              color={color}
              column={column}
              row={rowIndex}
              game = { this.props.game }
              selectable={currentColor === color ||
                          moves.indexOf(CONSTANTS.COLUMNS[column]
                          + CONSTANTS.ROWS[rowIndex]) !== -1
                         }
              onPieceSelect={this.onPieceSelected.bind(this)}
              key = { rowIndex + ' ' + i + 'piece'}
              rotate={this.state.rotate}
            />
          );
          column++;
        }
      }
    });

    return (
      <Animated.View
        style={[styles.container, this.getPieceTranfrom()]}
      >
        {squares.concat(pieces)}
      </Animated.View>
    );
  }

}

const styles = {
  container: {
    width: width,
    height: width,
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};

export default Board;
