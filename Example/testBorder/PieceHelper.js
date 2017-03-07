import {
  PAWN,
  BISHOP,
  ROOK,
  KNIGHT,
  KING,
  QUEEN
} from './Constants';

const PieceHelper = (char) => {
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

export default PieceHelper;
