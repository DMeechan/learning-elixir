import Piece from '../piece';

const whiteIcon = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
const blackIcon = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";

export default class Bishop extends Piece {
    constructor(player) {
        const iconUrl = (player === 1) ? whiteIcon : blackIcon;
        super(player, iconUrl);
    }

    isMovePossible(src, dest) {
        return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0);
    }

    /**
     * get path between src and dest (src and dest exclusive)
     * @param  {num} src  
     * @param  {num} dest 
     * @return {[array]}      
     */
    getSrcToDestPath(src, dest) {
        let path = [], pathStart, pathEnd, incrementBy;

        pathStart = (src > dest) ? dest : src;
        pathEnd = (src > dest) ? src : dest;

        if (Math.abs(src - dest) % 9 === 0) {
            incrementBy = 9;
            pathStart += 9;
        }
        else {
            incrementBy = 7;
            pathStart += 7;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }

        return path;
    }
}