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
    case 'p': return PAWN;
    case 'b': return BISHOP;
    case 'r': return ROOK;
    case 'q': return QUEEN;
    case 'n': return KNIGHT;
    case 'k': return KING;
    default: break;
  }
};

export default PieceHelper;
