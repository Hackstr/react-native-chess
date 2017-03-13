import Constants from './Constants';
import {
  PAWN,
  BISHOP,
  ROOK,
  KNIGHT,
  KING,
  QUEEN
} from './Constants';

export const pieceHelper = (char) => {
  switch (char) {
    case 'p': return '♟';
    case 'b': return '♝';
    case 'r': return '♜';
    case 'q': return '♛';
    case 'n': return '♞';
    case 'k': return '♚';
    default: break;
  }
};

export const reverseColor = (color) => {
  return (color === Constants.WHITE) ? Constants.BLACK : Constants.WHITE;
}

export const getPosibleMoves = (game, row, column) => {
  let moves = [];

  const currentSquare = { square:
    Constants.COLUMNS[column]
  + Constants.ROWS[row],
    verbose: true
  };

  game.moves(currentSquare).map(move => moves.push(move.to));

  return moves;
}

export const debugBorder = (color) => {
  return {
    borderColor: color,
    borderWidth: 1,
  }
}

// Convert String position "e2" to row and column
export const stringToPos = (str) => {

  const firstChar = str.charAt(0);
  const secondChar = str.charAt(1);

  const column = Constants.COLUMNS.indexOf(firstChar);
  const row = Constants.ROWS.indexOf(Number(secondChar));

  return {
    row,
    column,
  };
}

export const absolutePos = (row, column, width) => {
  const cellWidth = width / 8; //widht and height

  return {
    x: (row * cellWidth),
    y: (column * cellWidth),
    cellWidth
  };
}

export const posToString = (row, column) => {
  return Constants.COLUMNS[column] + Constants.ROWS[row];
}


export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
