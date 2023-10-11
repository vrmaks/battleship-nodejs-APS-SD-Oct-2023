const GameController = require('./gameController');
const Ship = require('./ship');
const BoardEntryStatus = require("./boardEntryStatus");
const cliColor = require("cli-color");
const readline = require("readline-sync");
const Battleship = require("./../battleship.js");
const letters = require("./letters");
const position = require("./position");

class GameBoard {
    constructor() {
        this.board = [
            new Array(8).fill(false),
            new Array(8).fill(false),
            new Array(8).fill(false),
            new Array(8).fill(false),
            new Array(8).fill(false),
            new Array(8).fill(false),
            new Array(8).fill(false),
            new Array(8).fill(false),
        ];
    }

    isOccupied(x, y) {
        return this.board[x][y];
    }

    occupy(x, y) {
        this.board[x][y] = true;
    }

    outputFleet() {
        console.log('  A B C D E F G H');

        for (let i = 0; i < this.board.length; i++) {
            const text = [(i+1).toString()];

            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[j][i];

                if (cell) {
                    text.push('X');
                } else {
                    text.push('.');
                }
            }

            console.log(text.join(' '));
        }
    }
}

class UserFleetSetupController {
  constructor(view) {
    this.view = view
  }

  /**
   * @param {Ship[]} ships
   * @param {number} rows
   * @param {number} columns
   */
  setupFleet(ships, rows = 8, columns = 8) {
    // ask user start position and direction (example A1 L)
    console.log(cliColor.green("~~~~~|| Fleet setup ||~~~~~"));
    console.log();

    console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");

    const that = this
    ships.forEach(function (ship) {
        console.log();
        that.view.showInfoMessage(`Please enter the positions for the ${ship.name} (size: ${ship.size})`);
        for (var i = 1; i < ship.size + 1; i++) {
                that.view.showCallToAction(`Enter position ${i} of ${ship.size} (i.e A3):`);
                const position = readline.question();
                // telemetryWorker.postMessage({eventName: 'Player_PlaceShipPosition', properties:  {Position: position, Ship: ship.name, PositionInShip: i}});
                ship.addPosition(UserFleetSetupController.ParsePosition(position));
        }
    })

    return GameController.InitializeShips()
  }

    static ParsePosition(input) {
        var letter = letters.get(input.toUpperCase().substring(0, 1));
        var number = parseInt(input.substring(1, 2), 10);
        return new position(letter, number);
    }

  /**
   * @param {GameBoard} board
   * @param {Ship} ship
   */
  setupShip(ship) {
    // ask input
    // validate ship, if validation error -> ask again
  }
}

module.exports = UserFleetSetupController