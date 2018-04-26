const assert = require('assert');

describe('Sudoku', function() {
  let sudoku = require('../src/sudoku');

  before(function() {
    sudoku.puzzle = [
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
  });

  describe('verifySquare', function() {

  });

  describe('verifyRow', function() {

  });

  describe('verifyColumn', function() {

  });

  describe('getRowForCell', function() {
    it('should return an array of 9 items', function() {
      assert.equal(sudoku.getRowForCell([3, 5]).length, 9);
    });

    it('should return the correct numbers', function() {
      assert.deepEqual(sudoku.getRowForCell([4, 3]), [9, 7, 4, 1, 5, 2, 3, 8, 6])
    })
  });

  describe('getColumnForCell', function() {
    it('should return an array of 9 items', function() {
      assert.equal(sudoku.getColumnForCell([2, 6]).length, 9);
    });

    it('should return the correct numbers', function() {
      assert.deepEqual(sudoku.getColumnForCell([7, 4]), [9, 3, 4, 8, 2, 1, 5, 7, 6])
    })
  });

  describe('getSquareForCell', function() {
    it('should return an array of 9 items', function() {
      assert.equal(sudoku.getSquareForCell([8, 7]).length, 9);
    });

    it('should return the correct numbers', function() {
      assert.deepEqual(sudoku.getSquareForCell([6, 6]), [8, 5, 3, 9, 7, 4, 1, 6, 2])
    })
  });
});