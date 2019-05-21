import { Bishop, King, Knight, Pawn, Queen, Rook } from '../components/pieces';

export default function initialiseBoard() {
    const squares = Array(64).fill(null);

    for (let i = 8; i < 16; i++) {
        squares[i] = new Pawn(2);
        squares[i + 40] = new Pawn(1);
    }

    squares[0] = new Rook(2);
    squares[1] = new Knight(2);
    squares[2] = new Bishop(2);
    squares[3] = new Queen(2);
    squares[4] = new King(2);
    squares[5] = new Bishop(2);
    squares[6] = new Knight(2);
    squares[7] = new Rook(2);

    squares[56] = new Rook(1);
    squares[57] = new Knight(1);
    squares[58] = new Bishop(1);
    squares[59] = new Queen(1);
    squares[60] = new King(1);
    squares[61] = new Bishop(1);
    squares[62] = new Knight(1);
    squares[63] = new Rook(1);
}