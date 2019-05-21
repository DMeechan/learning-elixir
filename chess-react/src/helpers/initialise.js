import Pieces, { Bishop, King, Knight, Pawn, Queen, Rook } from '../components/pieces';
// import Pieces from '../components/pieces';
// Pieces.Bishop

export default function initialiseBoard() {
    const squares = Array(64).fill(null);

    for (let i = 8; i < 16; i++) {
        squares[i] = new Pieces.Pawn(2);
        squares[i + 40] = new Pieces.Pawn(1);
    }

    squares[0] = new Pieces.Rook(2);
    squares[1] = new Pieces.Knight(2);
    squares[2] = new Pieces.Bishop(2);
    squares[3] = new Pieces.Queen(2);
    squares[4] = new Pieces.King(2);
    squares[5] = new Pieces.Bishop(2);
    squares[6] = new Pieces.Knight(2);
    squares[7] = new Pieces.Rook(2);

    squares[56] = new Pieces.Rook(1);
    squares[57] = new Pieces.Knight(1);
    squares[58] = new Pieces.Bishop(1);
    squares[59] = new Pieces.Queen(1);
    squares[60] = new Pieces.King(1);
    squares[61] = new Pieces.Bishop(1);
    squares[62] = new Pieces.Knight(1);
    squares[63] = new Pieces.Rook(1);

    return squares;
}