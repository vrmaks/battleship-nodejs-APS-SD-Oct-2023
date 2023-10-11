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

module.exports = isPositionCorrect