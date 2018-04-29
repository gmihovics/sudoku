// eslint-disable-next-line max-len
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["puzzle", "array"] }] */

function Sudoku() {
}

Sudoku.prototype.createPuzzle = function createPuzzle() {
  const puzzle = [];
  const numbers = Array(9).fill(0).map((number, index) => index + 1);

  return this.generateCell(puzzle, 0, this.shuffleArray(numbers), 0, []);
};

Sudoku.prototype.generateCell = function generatePuzzle(
  puzzle,
  cellIndex,
  numbers,
  numbersIndex,
  history
) {
  if (puzzle.length === 81 && cellIndex === puzzle.length) {
    return puzzle;
  }

  if (numbers.length === numbersIndex) {
    const previousIteration = history.pop();
    return this.generateCell(
      puzzle,
      cellIndex - 1,
      previousIteration.numbers,
      previousIteration.index + 1,
      history
    );
  }

  puzzle[cellIndex] = numbers[numbersIndex];

  const cell = [cellIndex % 9, Math.floor(cellIndex / 9)];

  if (
    this.verifyColumn(puzzle, cell)
    && this.verifySquare(puzzle, cell)
    && this.verifyRow(puzzle, cell)
  ) {
    history.push({ numbers, index: numbersIndex });

    if (cellIndex % 9 === 0) {
      // eslint-disable-next-line no-param-reassign
      numbers = this.shuffleArray(numbers);
    }

    return this.generateCell(puzzle, cellIndex + 1, numbers, 0, history);
  }

  puzzle[cellIndex] = null;

  return this.generateCell(puzzle, cellIndex, numbers, numbersIndex + 1, history);
};

Sudoku.prototype.shuffleArray = (array) => {
  // Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

Sudoku.prototype.verifyRow = function verifyRow(puzzle, cell) {
  const row = this.getRowForCell(puzzle, cell);
  return this.verifyArray(row);
};

Sudoku.prototype.verifyColumn = function verifyColumn(puzzle, cell) {
  const column = this.getColumnForCell(puzzle, cell);
  return this.verifyArray(column);
};

Sudoku.prototype.verifySquare = function verifySquare(puzzle, cell) {
  const square = this.getSquareForCell(puzzle, cell);
  return this.verifyArray(square);
};

Sudoku.prototype.verifyArray = (numberArray) => {
  const map = {};

  numberArray.forEach((element) => {
    if (!map[element]) {
      map[element] = 0;
    }

    map[element] += 1;
  });

  return Object.keys(map).every(key => map[key] === 1);
};

Sudoku.prototype.getSquareForCell = (puzzle, cell) => {
  const square = [];

  // Find which of the 3x3 grid of squares our cell is in
  const squareRowIndex = Math.floor(cell[1] / 3);
  const squareColumnIndex = Math.floor(cell[0] / 3);
  const squareStartingOffset = (squareRowIndex * 3 * 9) + (squareColumnIndex * 3);

  for (let rowOffset = 0; rowOffset < 3; rowOffset += 1) {
    for (let columnOffset = 0; columnOffset < 3; columnOffset += 1) {
      if (puzzle[squareStartingOffset + columnOffset + (rowOffset * 9)]) {
        square.push(puzzle[squareStartingOffset + columnOffset + (rowOffset * 9)]);
      }
    }
  }

  return square;
};

Sudoku.prototype.getRowForCell = (puzzle, cell) => {
  const row = [];
  const currentRow = cell[1] * 9;

  for (let i = 0; i < 9; i += 1) {
    if (puzzle[currentRow + i]) {
      row.push(puzzle[currentRow + i]);
    }
  }

  return row;
};

Sudoku.prototype.getColumnForCell = (puzzle, cell) => {
  const column = [];
  const currentColumn = cell[0];

  for (let i = 0; i < 9; i += 1) {
    if (puzzle[currentColumn + (i * 9)]) {
      column.push(puzzle[currentColumn + (i * 9)]);
    }
  }

  return column;
};

module.exports = new Sudoku();
