var colors = require("cli-color");
const Ship = require("./ship.js");



class Board {
    // ships //= new Ship[]
    // entryStatus [][]
    // enum {
    //     unknown
    //     hit
    //     miss
    // }

    outputBoard(showShips) {

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