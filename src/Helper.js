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
