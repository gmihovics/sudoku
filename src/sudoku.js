const Sudoku = function() {};

Sudoku.prototype.createPuzzle = function() {
  this.puzzle = [];
};

Sudoku.prototype.verifyRow = function(square) {
  return this.verifyArray(square);
};

Sudoku.prototype.verifyColumn = function(column) {
  return this.verifyArray(column);
};

Sudoku.prototype.verifySquare = function(row) {
  return this.verifyArray(row);
};

Sudoku.prototype.verifyArray = function(numberArray) {
  let map = {};

  numberArray.forEach(element => {
    if (!map[element]) {
      map[element] = 0;
    }

    map[element]++;
  });

  return Object.keys(map).every(key => map[key] === 1);
};

Sudoku.prototype.getSquareForCell = function(cell) {
  let square = [];

  //Find which of the 3x3 grid of squares our cell is in
  let squareRowIndex = Math.floor(cell[1] / 3);
  let squareColumnIndex = Math.floor(cell[0] / 3);
  let squareStartingOffset = (squareRowIndex * 3 * 9) + (squareColumnIndex * 3);

  for (let rowOffset = 0; rowOffset < 3; rowOffset++) {
    for (let columnOffset = 0; columnOffset < 3; columnOffset++) {
      square.push(this.puzzle[squareStartingOffset + columnOffset + (rowOffset * 9)]);
    }
  }

  return square;
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
    column[i] = this.puzzle[currentColumn + (i * 9)];
  }

  return column;
};

module.exports = new Sudoku();

