require("enum").register();
const GameController = require("./gameController");
const Ship = require("./ship");
const BoardEntryStatus = require("./boardEntryStatus");
const cliColor = require("cli-color");
const Battleship = require("./../battleship.js");
const letters = require("./letters");
const position = require("./position");
const ConsoleView = require("../view/ConsoleView");
const readline = require("readline-sync");

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

const Direction = new Enum({
  'L': 1,
  'R': 2,
  'D': 3,
  'U': 4,
});

class UserFleetSetupController {
  /**
   *
   * @param {ConsoleView} view
   */
  constructor(view) {
    this.view = view;
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

    console.log(
      "Please position your fleet (Game board size is from A to H and 1 to 8) :"
    );

    ships.forEach((ship) => {
      this.setupShip(this.board, ship);
    });

    return ships
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
  setupShip(board, ship) {
    console.log();
    this.view.showInfoMessage(
      `Please enter the positions for the ${ship.name} (size: ${ship.size})`
    );

    var valid = false;
    do {
      this.view.showCallToAction(
        `Enter position and direction of ship ${ship.size} (i.e A3 L):`
      );

      const { position, direction } = this.askUserShipPosition();
      this.initializeShipPosition(ship, position, direction);
    } while (!valid);
  }

  getXY(position) {
    let x = position.row - 1;
    let y = position.column.value - 1;

    return {x, y};
  }
    /**
   * @param {GameBoard} board
   * @param {Ship} ship
   */
    validate(board, ship) {
      for (const position of ship.positions) {
        let {x, y} = this.getXY(position)
        if (board.isOccupied(x,y)) {
          return false
        }
      }
      return true
    }

    forcePlaceShip(board, ship) {
      for (const position of ship.positions) {
        let {x, y} = this.getXY(position)
        board.occupy(x,y)
      }
    }

  /**
   *
   * @param {Ship} ship
   * @param {position} pos
   * @param {Direction} direction
   */
  initializeShipPosition(ship, pos, direction) {
    let delta;

    switch (direction) {
      case Direction.L:
        delta = { x: 1, y: 0 };
        break;
      case Direction.R:
        delta = { x: -1, y: 0 };
        break;
      case Direction.U:
        delta = { x: 0, y: -1 };
        break;
      case Direction.D:
        delta = { x: 0, y: 1 };
        break;
    }

    for (let i = 0; i < ship.size; ++i) {
      ship.addPosition(
        new position(pos.column + i * delta.x, pos.row + i * delta.y)
      );
    }
  }

  /**
   *
   * @returns {{
   *  position: position
   *  direction: Direction
   * }}
   */
  askUserShipPosition() {
    const [position, direction] = readline.question().split(" ");

    return {
      position: UserFleetSetupController.ParsePosition(position),
      direction: Direction[direction],
    };
  }
}

module.exports = UserFleetSetupController;
