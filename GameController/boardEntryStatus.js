require('enum').register();

var BoardEntryStatus = new Enum({
    'unknown': 1,
    'hit': 2,
    'miss': 3,
}, {
    ignoreCase: true
});

module.exports = BoardEntryStatus;