import Constants from './Constants';

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
