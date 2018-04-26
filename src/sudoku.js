const Sudoku = function () {};

Sudoku.prototype.createPuzzle = function() {
  this.puzzle = [];
};

Sudoku.prototype.verifyRow = function() {

};

Sudoku.prototype.verifyColumn = function() {

};

Sudoku.prototype.verifySquare = function() {

};

Sudoku.prototype.getSquareForCell = function(cell) {
  return [];
};

Sudoku.prototype.getRowForCell = function(cell) {
  let row = [];
  let currentRow = cell[1] * 9;

  for (let i = 0; i < 9; i++) {
    row[i] = this.puzzle[currentRow + i];
  }

  return row;
};

Sudoku.prototype.getColumnForCell = function(cell) {
  let column = [];
  let currentColumn = cell[0];

  for (let i = 0; i < 9; i++) {
    column[i] = this.puzzle[currentColumn + (i*9)];
  }

  return column;
};

module.exports = new Sudoku();

