var colors = require("cli-color");
const Ship = require("./ship.js");
const BoardEntryStatus = require('./boardEntryStatus');



class Board {
    // ships //= new Ship[]

    // entryStatus [][]
    // enum {
    //     unknown
    //     hit
    //     miss
    // }

    constructor(ships, rows = 8, columns = 8) {
        this.ships = ships;
        // this.entryStatus = new Array(rows).fill();

        this.entryStatus = [
            new Array(columns).fill(BoardEntryStatus.unknown),
            new Array(columns).fill(BoardEntryStatus.unknown),
            new Array(columns).fill(BoardEntryStatus.unknown),
            new Array(columns).fill(BoardEntryStatus.unknown),
            new Array(columns).fill(BoardEntryStatus.unknown),
            new Array(columns).fill(BoardEntryStatus.unknown),
            new Array(columns).fill(BoardEntryStatus.unknown),
            new Array(columns).fill(BoardEntryStatus.unknown),
        ];
    }

    outputBoard(showShips) {

        this.entryStatus.forEach(row => {
            let text = [];
            row.forEach(cell => {
                switch (cell) {
                    case BoardEntryStatus.unknown: text.push('.'); break;
                    case BoardEntryStatus.hit: text.push('X'); break;
                    case BoardEntryStatus.miss: text.push('*'); break;
                }
            });

            console.log(text.join(' '));
        });

    }

    getXY(position) {
        let x = position.row - 1;
        let y = position.column.value - 1;

        return {x, y};
    }

    hit(position) {
        let {x, y} = this.getXY(position);

        if (this.entryStatus[x][y] !== BoardEntryStatus.unknown) {
            return {
                oldStatus: this.entryStatus[x][y],
                newStatus: this.entryStatus[x][y],
            };
        }

        let isHit = false;

        this.ships.forEach(ship => {
            ship.positions.forEach(shipPosition => {
                let { x: shipX, y: shipY } = this.getXY(shipPosition);

                if (x === shipX && y === shipY) {
                    isHit = true;
                }
            });
        })

        if (isHit) {
            this.entryStatus[x][y] = BoardEntryStatus.hit;
        } else {
            this.entryStatus[x][y] = BoardEntryStatus.miss;
        }

        return {
            oldStatus: BoardEntryStatus.unknown,
            newStatus: this.entryStatus[x][y],
        };
    }

    outputPlayerBoard() {
        // board 
        // with shots
        // with ships
    }

    outputEnemyBoard() {
        // board 
        // with shots
        // NO ships
    }

    aliveShips() {
        const shipsLeftCount = 3
        return `ships left ${shipsLeftCount}`
    }
}

module.exports = Board;