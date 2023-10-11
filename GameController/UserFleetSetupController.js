const GameController = require('./gameController');
const Ship = require('./ship');

class GameBoard {

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
                telemetryWorker.postMessage({eventName: 'Player_PlaceShipPosition', properties:  {Position: position, Ship: ship.name, PositionInShip: i}});
                ship.addPosition(Battleship.ParsePosition(position));
        }
    })

    return GameController.InitializeShips()
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