import Piece from '../piece';

const whiteIcon = "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg";
const blackIcon = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";

export default class King extends Piece {
    constructor(player) {
        const iconUrl = (player === 1) ? whiteIcon : blackIcon;
        super(player, iconUrl);
    }

    isMovePossible(src, dest) {
        return (
            src - 9 === dest ||
            src + 9 === dest ||
            src - 8 === dest ||
            src + 8 === dest ||
            src - 7 === dest ||
            src + 7 === dest ||
            src - 1 === dest ||
            src + 1 === dest
        );
    }

    /**
     * Will always return empty array because King can only move 1 step at a time
     * @param {*} src 
     * @param {*} dest 
     */
    getSrcToDestPath(src, dest) {
        return [];
    }
}