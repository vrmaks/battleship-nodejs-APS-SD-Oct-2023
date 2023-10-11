const colors = require("cli-color");

const GameController = require("../GameController/gameController");
const Ship = require("../GameController/ship");
const letters = require("../GameController/letters.js");

class FleetInitializer {
   /**
   * @returns {Ship[]}
   */
  getRandomAiFleet() {
    return VARIANTS[Math.floor(Math.random() * VARIANTS.length)]
  }
}

const VARIANTS = [
  [
    new Ship("Aircraft Carrier", 5, colors.CadetBlue)
      .addPosition(new position(letters.B, 4))
      .addPosition(new position(letters.B, 5))
      .addPosition(new position(letters.B, 6))
      .addPosition(new position(letters.B, 7))
      .addPosition(new position(letters.B, 8)),

    new Ship("Battleship", 4, colors.Red)
      .addPosition(new position(letters.E, 5))
      .addPosition(new position(letters.E, 6))
      .addPosition(new position(letters.E, 7))
      .addPosition(new position(letters.E, 8)),

    new Ship("Submarine", 3, colors.Chartreuse)
      .addPosition(new position(letters.A, 3))
      .addPosition(new position(letters.B, 3))
      .addPosition(new position(letters.C, 3)),

    new Ship("Destroyer", 3, colors.Yellow)
      .addPosition(new position(letters.F, 8))
      .addPosition(new position(letters.G, 8))
      .addPosition(new position(letters.H, 8)),

    new Ship("Patrol Boat", 2, colors.Orange)
      .addPosition(new position(letters.C, 5))
      .addPosition(new position(letters.C, 6)),
  ],

  [
    new Ship("Aircraft Carrier", 5, colors.CadetBlue)
      .addPosition(new position(letters.A, 1))
      .addPosition(new position(letters.A, 2))
      .addPosition(new position(letters.A, 3))
      .addPosition(new position(letters.A, 4))
      .addPosition(new position(letters.A, 5)),

    new Ship("Battleship", 4, colors.Red)
      .addPosition(new position(letters.C, 3))
      .addPosition(new position(letters.D, 3))
      .addPosition(new position(letters.E, 3))
      .addPosition(new position(letters.F, 3)),

    new Ship("Submarine", 3, colors.Chartreuse)
      .addPosition(new position(letters.B, 6))
      .addPosition(new position(letters.C, 6))
      .addPosition(new position(letters.D, 6)),

    new Ship("Destroyer", 3, colors.Yellow)
      .addPosition(new position(letters.F, 8))
      .addPosition(new position(letters.G, 8))
      .addPosition(new position(letters.H, 8)),

    new Ship("Patrol Boat", 2, colors.Orange)
      .addPosition(new position(letters.B, 4))
      .addPosition(new position(letters.B, 5)),
  ],

  [
    new Ship("Aircraft Carrier", 5, colors.CadetBlue)
      .addPosition(new position(letters.C, 3))
      .addPosition(new position(letters.D, 3))
      .addPosition(new position(letters.E, 3))
      .addPosition(new position(letters.F, 3))
      .addPosition(new position(letters.G, 3)),

    new Ship("Battleship", 4, colors.Red)
      .addPosition(new position(letters.C, 3))
      .addPosition(new position(letters.D, 3))
      .addPosition(new position(letters.E, 3))
      .addPosition(new position(letters.F, 3)),

    new Ship("Submarine", 3, colors.Chartreuse)
      .addPosition(new position(letters.B, 6))
      .addPosition(new position(letters.C, 6))
      .addPosition(new position(letters.D, 6)),

    new Ship("Destroyer", 3, colors.Yellow)
      .addPosition(new position(letters.F, 8))
      .addPosition(new position(letters.G, 8))
      .addPosition(new position(letters.H, 8)),

    new Ship("Patrol Boat", 2, colors.Orange)
      .addPosition(new position(letters.B, 4))
      .addPosition(new position(letters.B, 5)),
  ],
];

module.exports = FleetInitializer;
