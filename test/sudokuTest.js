const assert = require('chai').assert;
const sudoku = require('../src/sudoku');

describe('Sudoku', function() {
  let puzzle = [
    4, 5, 6, 7, 1, 3, 2, 9, 8,
    1, 2, 9, 6, 8, 4, 5, 3, 7,
    7, 3, 8, 2, 9, 5, 6, 4, 1,
    9, 7, 4, 1, 5, 2, 3, 8, 6,
    5, 1, 3, 8, 7, 6, 4, 2, 9,
    8, 6, 2, 4, 3, 9, 7, 1, 5,
    2, 4, 1, 9, 6, 7, 8, 5, 3,
    6, 8, 5, 3, 2, 1, 9, 7, 4,
    3, 9, 7, 5, 4, 8, 1, 6, 2
  ];

  describe('verifyArray', function() {
    it('should return true when all numbers in an array are unique', function() {
      assert.isTrue(sudoku.verifyArray([4, 5, 6, 1, 2, 9, 7, 3, 8]));
    });

    it('should return true when an array is completely empty', function() {
      assert.isTrue(sudoku.verifyArray([]));
    });

    it('should return true when an array is partially empty and valid', function() {
      assert.isTrue(sudoku.verifyArray([4, 3, 8, 7, 9]));
    });

    it('should return false when all the numbers in an array are not unique', function() {
      assert.isNotTrue(sudoku.verifyArray([4, 3, 8, 7, 9, 3, 5, 1, 2]));
    });

    it('should return false when an array is partially empty and not valid', function() {
      assert.isNotTrue(sudoku.verifyArray([4, 3, 8, 7, 9, 4]));
    });
  });

  describe('getRowForCell', function() {
    it('should return an array of 9 items', function() {
      assert.equal(sudoku.getRowForCell(puzzle, [3, 5]).length, 9);
    });

    it('should return the correct numbers', function() {
      assert.deepEqual(sudoku.getRowForCell(puzzle, [4, 3]), [9, 7, 4, 1, 5, 2, 3, 8, 6]);
    })
  });

  describe('getColumnForCell', function() {
    it('should return an array of 9 items', function() {
      assert.equal(sudoku.getColumnForCell(puzzle, [2, 6]).length, 9);
    });

    it('should return the correct numbers', function() {
      assert.deepEqual(sudoku.getColumnForCell(puzzle, [7, 4]), [9, 3, 4, 8, 2, 1, 5, 7, 6]);
    })
  });

  describe('getSquareForCell', function() {
    it('should return an array of 9 items', function() {
      assert.equal(sudoku.getSquareForCell(puzzle, [8, 7]).length, 9);
    });

    it('should return the correct numbers', function() {
      assert.deepEqual(sudoku.getSquareForCell(puzzle, [6, 6]), [8, 5, 3, 9, 7, 4, 1, 6, 2]);
    });

    it('should return the square for cell [0,0]', function() {
      assert.deepEqual(sudoku.getSquareForCell(puzzle, [0, 0]), [4, 5, 6, 1, 2, 9, 7, 3, 8]);
    });

    it('should return the center square for cell [4,4]', function() {
      assert.deepEqual(sudoku.getSquareForCell(puzzle, [4, 4]), [1, 5, 2, 8, 7, 6, 4, 3, 9]);
    });
  });

  describe('createPuzzle', function() {
    it('should return an array of 81 numbers', function() {
      assert.equal(sudoku.createPuzzle().length, 81);
    });
  });

  describe('generateCell', function() {
    it('should return a completed puzzle when the last cell is successfully filled', function() {
      let puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 6
      ];

      assert.equal(sudoku.generateCell(puzzle, 80, [2], 0).length, 81);
    });

    it('should set the current cell with a valid number when found', function() {
      let puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 6
      ];

      assert.equal(sudoku.generateCell(puzzle, 80, [2], 0)[80], 2);
    });

    it('should go through all available numbers until it finds a valid one', function() {
      let puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1
      ];

      assert.equal(sudoku.generateCell(puzzle, 80, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0)[80], 2);
    });

    it('should find the next cell after filling the current one', function() {
      let puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1
      ];

      assert.equal(sudoku.generateCell(puzzle, 80, [6, 2], 0)[80], 2);
    });

    it('should backtrack and change the previous cell when no numbers can be found for the current cell', function() {
      let puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 2
      ];

      assert.equal(sudoku.generateCell(puzzle, 80, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0)[79], 6);
    });
  });
});
