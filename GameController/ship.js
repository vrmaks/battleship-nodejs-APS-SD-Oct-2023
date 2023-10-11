const Position = require('./position');

class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
    }


    /**
     * 
     * @param {Position} position
     * @returns {Ship}
     */
    addPosition(position) {
        this.positions.push(position);

        return this
    }
}

module.exports = Ship;