const { Worker, isMainThread } = require("worker_threads");
const readline = require("readline-sync");
const gameController = require("./GameController/gameController.js");
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
const ConsoleView = require("./view/ConsoleView.js");
const isPositionCorrect = require("./GameController/checkPosition.js");
const FleetInitializer = require("./Fleet/FleetInitializer.js");
const BoardEntryStatus = require("./GameController/boardEntryStatus");
const UserFleetSetupController = require("./GameController/UserFleetSetupController");

const Board = require("./GameController/board.js");

let telemetryWorker;

class Battleship {
  constructor() {
  }

  view = new ConsoleView();
  fleetInitializer = new FleetInitializer();
  userFleetSetupController = new UserFleetSetupController(this.view);

  start() {
    telemetryWorker = new Worker("./TelemetryClient/telemetryClient.js");

    console.log("Starting...");
    telemetryWorker.postMessage({
      eventName: "ApplicationStarted",
      properties: { Technology: "Node.js" },
    });

    this.view.showIntro();

    this.InitializeGame();
    this.StartGame();
  }

  StartGame() {
    this.view.clear();
    this.view.showGamePhase();

    do {
      console.log();
      console.log("Player, it's your turn");

      this.enemyBoard.outputBoard(false);

      this.view.showCallToAction("Enter coordinates for your shot :");

      var position = Battleship.ParsePosition(readline.question());

      while (!isPositionCorrect(position)) {
        console.log();
        this.view.showCallToAction(
          "Incorrect input. You couldn't hit outside the field. Try again:"
        );

        position = Battleship.ParsePosition(readline.question());
      }

      // var isHit = gameController.CheckIsHit(this.enemyBoard.ships, position);
      let { oldStatus, newStatus } = this.enemyBoard.hit(position);

      telemetryWorker.postMessage({
        eventName: "Player_ShootPosition",
        properties: { Position: position.toString(), IsHit: isHit },
      });

      if (oldStatus !== newStatus) {
        const isHit = newStatus === BoardEntryStatus.hit;

        if (isHit) {
          this.view.showHit();
        }

        if (isHit) {
          this.view.showSuccessMessage("Yeah ! Nice hit !");
        } else {
          this.view.showMissMessage("Miss");
        }
      } else {
        this.view.showInfoMessage("Duplicate");
      }

      var computerPos = this.GetRandomPosition();
      var isHit = gameController.CheckIsHit(this.myBoard.ships, computerPos);

      telemetryWorker.postMessage({
        eventName: "Computer_ShootPosition",
        properties: { Position: computerPos.toString(), IsHit: isHit },
      });

      console.log();
      console.log(
        `Computer shot in ${computerPos.column}${computerPos.row} and ` +
          (isHit ? `has hit your ship !` : `miss`)
      );
      if (isHit) {
        this.view.showHit();
      }
    } while (true);
  }

  static ParsePosition(input) {
    var letter = letters.get(input.toUpperCase().substring(0, 1));
    var number = parseInt(input.substring(1, 2), 10);
    return new position(letter, number);
  }

  GetRandomPosition() {
    var rows = 8;
    var lines = 8;
    var rndColumn = Math.floor(Math.random() * lines) + 1;
    var letter = letters.get(rndColumn);
    var number = Math.floor(Math.random() * rows) + 1;

    return new position(letter, number);
  }

  InitializeGame() {
    this.InitializeMyFleet();
    this.InitializeEnemyFleet();
  }

  InitializeMyFleet() {
    const ships = this.userFleetSetupController.setupFleet(
      gameController.InitializeShips()
    );

    this.myBoard = new Board(ships, 8, 8);
  }

  InitializeEnemyFleet() {
    this.enemyBoard = new Board(this.fleetInitializer.getRandomAiFleet(), 8, 8);
  }
}

module.exports = Battleship;
