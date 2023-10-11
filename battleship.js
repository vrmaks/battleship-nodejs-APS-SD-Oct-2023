const { Worker, isMainThread } = require('worker_threads');
const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
const ConsoleView = require('./view/ConsoleView.js')
let telemetryWorker;

function isPositionCorrect(position) {
    if (!position.column || !position.row) {
        return false;
    }

    if (position.row < 1 || position.row > 8) {
        return false;
    }

    if (position.column.value < 1 || position.column.value > 8) {
        return false;
    }

    return true;
}

class Battleship {
    view = new ConsoleView()

    start() {
        telemetryWorker = new Worker("./TelemetryClient/telemetryClient.js");   

        console.log("Starting...");
        telemetryWorker.postMessage({eventName: 'ApplicationStarted', properties:  {Technology: 'Node.js'}});

        this.view.showIntro()

        this.InitializeGame();
        this.StartGame();
    }

    StartGame() {
        this.view.clear()
        this.view.showGamePhase()

        do {
            console.log();
            console.log("Player, it's your turn");
            this.view.showCallToAction("Enter coordinates for your shot :");

            var position = Battleship.ParsePosition(readline.question());

            while (!isPositionCorrect(position)) {
                console.log();
                this.view.showCallToAction("Incorrect input. You couldn't hit outside the field. Try again:");

                position = Battleship.ParsePosition(readline.question());
            }

            var isHit = gameController.CheckIsHit(this.enemyFleet, position);

            telemetryWorker.postMessage({eventName: 'Player_ShootPosition', properties:  {Position: position.toString(), IsHit: isHit}});

            if (isHit) {
                this.view.showHit();
            }
            if (isHit) {
                this.view.showSuccessMessage("Yeah ! Nice hit !");
            } else {
                this.view.showMissMessage("Miss");
            }

            var computerPos = this.GetRandomPosition();
            var isHit = gameController.CheckIsHit(this.myFleet, computerPos);

            telemetryWorker.postMessage({eventName: 'Computer_ShootPosition', properties:  {Position: computerPos.toString(), IsHit: isHit}});

            console.log();
            console.log(`Computer shot in ${computerPos.column}${computerPos.row} and ` + (isHit ? `has hit your ship !` : `miss`));
            if (isHit) {
                this.view.showHit()
            }
        }
        while (true);
    }

    static ParsePosition(input) {
        var letter = letters.get(input.toUpperCase().substring(0, 1));
        var number = parseInt(input.substring(1, 2), 10);
        return new position(letter, number);
    }

    GetRandomPosition() {
        var rows = 8;
        var lines = 8;
        var rndColumn = Math.floor((Math.random() * lines)) + 1;
        var letter = letters.get(rndColumn);
        var number = Math.floor((Math.random() * rows)) + 1;

        return new position(letter, number);
    }

    InitializeGame() {
        this.InitializeMyFleet();
        this.InitializeEnemyFleet();
    }

    InitializeMyFleet() {
        this.myFleet = gameController.InitializeShips();

        console.log(cliColor.green("~~~~~|| Fleet setup ||~~~~~"));
        console.log();

        console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");

        var that = this;
        this.myFleet.forEach(function (ship) {
            console.log();
            that.view.showInfoMessage(`Please enter the positions for the ${ship.name} (size: ${ship.size})`);
            for (var i = 1; i < ship.size + 1; i++) {
                    that.view.showCallToAction(`Enter position ${i} of ${ship.size} (i.e A3):`);
                    const position = readline.question();
                    telemetryWorker.postMessage({eventName: 'Player_PlaceShipPosition', properties:  {Position: position, Ship: ship.name, PositionInShip: i}});
                    ship.addPosition(Battleship.ParsePosition(position));
            }
        })
    }

    InitializeEnemyFleet() {
        this.enemyFleet = gameController.InitializeShips();

        this.enemyFleet[0].addPosition(new position(letters.B, 4));
        this.enemyFleet[0].addPosition(new position(letters.B, 5));
        this.enemyFleet[0].addPosition(new position(letters.B, 6));
        this.enemyFleet[0].addPosition(new position(letters.B, 7));
        this.enemyFleet[0].addPosition(new position(letters.B, 8));

        this.enemyFleet[1].addPosition(new position(letters.E, 6));
        this.enemyFleet[1].addPosition(new position(letters.E, 7));
        this.enemyFleet[1].addPosition(new position(letters.E, 8));
        this.enemyFleet[1].addPosition(new position(letters.E, 9));

        this.enemyFleet[2].addPosition(new position(letters.A, 3));
        this.enemyFleet[2].addPosition(new position(letters.B, 3));
        this.enemyFleet[2].addPosition(new position(letters.C, 3));

        this.enemyFleet[3].addPosition(new position(letters.F, 8));
        this.enemyFleet[3].addPosition(new position(letters.G, 8));
        this.enemyFleet[3].addPosition(new position(letters.H, 8));

        this.enemyFleet[4].addPosition(new position(letters.C, 5));
        this.enemyFleet[4].addPosition(new position(letters.C, 6));
    }
}

module.exports = Battleship;