const assert = require("assert").strict;
const battleship = require("../battleship.js");
const letters = require("../GameController/letters.js");
const position = require("../GameController/position.js");

const FleetInitializer = require("../Fleet/FleetInitializer.js");
const isPositionCorrect = require("../GameController/checkPosition.js");

describe("fleetVariants", function () {
  it("should store valid AI fleet variants", function () {
    const fleetInitializer = new FleetInitializer();

    fleetInitializer.VARIANTS.forEach((ships) => {
      ships.forEach((ship) => {
        ship.positions.forEach((position) =>
          assert.equal(true, isPositionCorrect(position))
        );
      });
    });
  });
});
