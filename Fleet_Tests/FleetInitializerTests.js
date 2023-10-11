const assert = require("assert").strict;
const battleship = require("../battleship.js");
const letters = require("../GameController/letters.js");
const position = require("../GameController/position.js");

const FleetInitializer = require("../Fleet/FleetInitializer.js");
const isPositionCorrect = require("../GameController/checkPosition.js");

describe("FleetInitializer", function () {
  it("should return random fleet variant", function () {
    const fleetInitializer = new FleetInitializer();

    const result = fleetInitializer.getRandomAiFleet();
    assert.equal(5, result.length);
  });
});
