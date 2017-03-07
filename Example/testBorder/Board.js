import React, { Component } from 'react';
import {
  Dimensions,
  Animated,
  View
} from 'react-native';
import Victor from 'victor';
import Square from './Square';
import Piece from './Piece';
import CONSTANTS from './Constants';
import { reverseColor, getPosibleMoves, debugBorder, stringToPos } from './Helper';

import Svg,{
    Line,
    Polygon,
} from 'react-native-svg';

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
      arrow: {
        from: null,
        to: null,
        isVisible: false,
        rotateAngle: null,
      },
      lastMove: {
        from: null,
        to: null,
        type: null,
        captured: null,
        promotion: null,
      }
    };
  }


  onPieceSelected(row, column, color, hasMoves) {
    // this.setArrowValues(stringToPos('d4'), stringToPos('d6'));
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

  setArrowValues(from, to) {
    const cellWidth = width / 8; //widht and height
    const cellHeight = cellWidth;

    const isVisible = true;

    const tempFrom = {
      x: (from.row * cellWidth) + cellWidth / 2,
      y: (from.column * cellHeight) + cellHeight / 2,
    };

    const tempTo = {
      x: (to.row * cellWidth) + cellWidth / 2,
      y: (to.column * cellHeight) + cellHeight / 2,
    };

    const testVector = new Victor(tempFrom.x - tempTo.x, tempFrom.y - tempTo.y);
    const rotateAngle = testVector.horizontalAngleDeg();

    const vectr = {x: tempTo.x - tempFrom.x, y: tempTo.y - tempFrom.y };
    console.log(tempFrom, tempTo, vectr);

    this.setState({ arrow: { isVisible, from: tempFrom, to: tempTo, rotateAngle }})
  }

  drawArrow() {
    const { isVisible, positionX, positionY, tempHeight, from, to, rotateAngle } = this.state.arrow;

    const rectStyle = {
        position: 'absolute',
        zIndex: 1,
        transform: [
          {rotateY: "180deg"},
          {rotate: "90deg"}
        ],
    };

    if (isVisible) {
      return (
        <View
        pointerEvents="none" style={rectStyle}>
          <Svg
              height= { width }
              width= { width }
          >
            <Line
              x1={ from.x }
              y1={ from.y }
              x2={ to.x }
              y2={ to.y }
              stroke="green"
              strokeWidth="4"
            />
            <Polygon
              points={ (() => { return `${to.x},${to.y - 10} ${to.x - 10},${to.y} ${to.x},${to.y + 10}` })() }
              fill="green"
              stroke="purple"
              strokeWidth="1"
              rotate={ rotateAngle }
              origin={ (() => { return `${to.x}, ${to.y}` })() }
            />
          </Svg>
        </View>
      );
    }
  }


  // <Polygon
  //   points="250,235 240,247 250,260"
  //   fill="green"
  //   strokeWidth="1"
  // />

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
    let lastMove = {};

    if (gameMove) {
      keys[row][column] = keys[this.state.selectedPiece.row][this.state.selectedPiece.column];
      keys[this.state.selectedPiece.row][this.state.selectedPiece.column] = null;

      lastMove = gameMove;

      if(gameMove.captured) {
        const capturedPiece = { type: gameMove.captured, color: reverseColor(this.props.turn) };
        lastMove.captured = capturedPiece;
        this.props.captureCallback(capturedPiece);
      }
    }

    //Test
    this.setArrowValues(stringToPos(lastMove.from), stringToPos(lastMove.to));

    this.props.moveCallback(row, column, lastMove);
    this.props.turnComplete();
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

    const currentColor = (this.props.twoPlayer) ? this.props.playerColor : this.props.turn;

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
                ref = { CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[rowIndex]}
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
              ref = { CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[rowIndex]}
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
              isRotate = { this.props.isRotate }
            />
          );
          column++;
        }
      }
    });

    return (
      <Animated.View style={[styles.container, this.getPieceTranfrom()]}>
        {squares.concat(pieces)}
        {this.drawArrow()}
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
