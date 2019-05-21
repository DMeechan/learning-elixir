import Piece from '../piece';

const whiteIcon = "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
const blackIcon = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";

export default class Knight extends Piece {
    constructor(player) {
        const iconUrl = (player === 1) ? whiteIcon : blackIcon;
        super(player, iconUrl);
    }

    isMovePossible(src, dest) {
        return (
            src - 17 === dest ||
            src - 10 === dest ||
            src + 6 === dest ||
            src + 15 === dest ||
            src - 15 === dest ||
            src - 6 === dest ||
            src + 10 === dest ||
            src + 17 === dest
        );
    }

    /**
     * always returns empty array because of jumping
     * @return {[]}
     */
    getSrcToDestPath() {
        return [];
    }
}