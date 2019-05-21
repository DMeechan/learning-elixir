import Piece from './piece';

const whiteIcon = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
const blackIcon = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";

export default class Rook extends Piece {
    constructor(player) {
        const iconUrl = (player === 1) ? whiteIcon : blackIcon;
        super(player, iconUrl);
    }

    isMovePossible(src, dest) {
        let mod = src % 8;
        let diff = 8 - mod;
        return (Math.abs(src - dest) % 8 === 0 || (dest >= (src - mod) && dest < (src + diff)));
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

        if (Math.abs(src - dest) % 8 === 0) {
            incrementBy = 8;
            pathStart += 8;
        }
        else {
            incrementBy = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }

        return path;
    }
}