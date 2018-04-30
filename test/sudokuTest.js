const { assert } = require('chai');
const sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);
const sudoku = require('../src/backend/sudoku');

describe('Sudoku', () => {
  const puzzle = [
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

  describe('verifyArray', () => {
    it('should return true when all numbers in an array are unique', () => {
      assert.isTrue(sudoku.verifyArray([4, 5, 6, 1, 2, 9, 7, 3, 8]));
    });

    it('should return true when an array is completely empty', () => {
      assert.isTrue(sudoku.verifyArray([]));
    });

    it('should return true when an array is partially empty and valid', () => {
      assert.isTrue(sudoku.verifyArray([4, 3, 8, 7, 9]));
    });

    it('should return false when all the numbers in an array are not unique', () => {
      assert.isNotTrue(sudoku.verifyArray([4, 3, 8, 7, 9, 3, 5, 1, 2]));
    });

    it('should return false when an array is partially empty and not valid', () => {
      assert.isNotTrue(sudoku.verifyArray([4, 3, 8, 7, 9, 4]));
    });
  });

  describe('getRowForCell', () => {
    it('should return an array of 9 items', () => {
      assert.equal(sudoku.getRowForCell(puzzle, [3, 5]).length, 9);
    });

    it('should return the correct numbers', () => {
      assert.deepEqual(sudoku.getRowForCell(puzzle, [4, 3]), [9, 7, 4, 1, 5, 2, 3, 8, 6]);
    });

    it('should ignore undefined values and skip over them', () => {
      const puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, undefined, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 6, 2
      ];

      assert.deepEqual(sudoku.getRowForCell(puzzle, [2, 4]), [5, 1, 8, 7, 6, 4, 2, 9]);
    });
  });

  describe('getColumnForCell', () => {
    it('should return an array of 9 items', () => {
      assert.equal(sudoku.getColumnForCell(puzzle, [2, 6]).length, 9);
    });

    it('should return the correct numbers', () => {
      assert.deepEqual(sudoku.getColumnForCell(puzzle, [7, 4]), [9, 3, 4, 8, 2, 1, 5, 7, 6]);
    });

    it('should ignore undefined values and skip over them', () => {
      const puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, undefined, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 6, 2
      ];

      assert.deepEqual(sudoku.getColumnForCell(puzzle, [2, 3]), [6, 9, 8, 4, 2, 1, 5, 7]);
    });
  });

  describe('getSquareForCell', () => {
    it('should return an array of 9 items', () => {
      assert.equal(sudoku.getSquareForCell(puzzle, [8, 7]).length, 9);
    });

    it('should return the correct numbers', () => {
      assert.deepEqual(sudoku.getSquareForCell(puzzle, [6, 6]), [8, 5, 3, 9, 7, 4, 1, 6, 2]);
    });

    it('should return the square for cell [0,0]', () => {
      assert.deepEqual(sudoku.getSquareForCell(puzzle, [0, 0]), [4, 5, 6, 1, 2, 9, 7, 3, 8]);
    });

    it('should return the center square for cell [4,4]', () => {
      assert.deepEqual(sudoku.getSquareForCell(puzzle, [4, 4]), [1, 5, 2, 8, 7, 6, 4, 3, 9]);
    });

    it('should ignore undefined values and skip over them', () => {
      const puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, undefined, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 6, 2
      ];

      assert.deepEqual(sudoku.getSquareForCell(puzzle, [1, 5]), [9, 7, 4, 5, 1, 8, 6, 2]);
    });
  });

  describe('createPuzzle', () => {
    // eslint-disable-next-line func-names
    it('should extract static cells from the options object and preset the values in the puzzle', sinonTest(function () {
      const generateCellStub = this.stub(sudoku, 'generateCell');

      generateCellStub.returns([]);
      sudoku.createPuzzle({ staticCells: { 0: 5, 72: 2 } });

      assert.deepEqual(generateCellStub.args[0][5], [0, 72]);
    }));

    // eslint-disable-next-line func-names
    it('should extract static cells from the options object and pass the cell indexes in an array', sinonTest(function () {
      const generateCellStub = this.stub(sudoku, 'generateCell');

      generateCellStub.returns([]);
      sudoku.createPuzzle({ staticCells: { 0: 5, 72: 2 } });

      const puzzle = generateCellStub.args[0][0];

      assert.deepEqual([puzzle[0], puzzle[72]], [5, 2]);
    }));

    describe.skip('Integration tests', () => {
      let puzzle = [];

      it('should return an array of 81 numbers', () => {
        puzzle = sudoku.createPuzzle();

        assert.equal(puzzle.length, 81);
      });

      it('should return a puzzle that has 9 valid rows', () => {
        for (let i = 0; i < 9; i += 1) {
          assert.isTrue(sudoku.verifyRow(puzzle, [0, i]));
        }
      });

      it('should return a puzzle that has 9 valid columns', () => {
        for (let i = 0; i < 9; i += 1) {
          assert.isTrue(sudoku.verifyColumn(puzzle, [i, 0]));
        }
      });

      it('should return a puzzle that has 9 valid columns', () => {
        for (let i = 0; i < 3; i += 1) {
          for (let j = 0; j < 3; j += 1) {
            assert.isTrue(sudoku.verifySquare(puzzle, [j * 3, i * 3]));
          }
        }
      });
    });
  });

  describe('generateCell', () => {
    it('should return a completed puzzle when there are no more cells to generate', () => {
      const puzzle = [
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

      assert.equal(sudoku.generateCell(puzzle, 81, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0, []).length, 81);
    });

    it('should set the current cell with a valid number when found', () => {
      const puzzle = [
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

      assert.equal(sudoku.generateCell(puzzle, 80, [2], 0, [])[80], 2);
    });

    it('should return a completed puzzle when the last cell is successfully filled', () => {
      const puzzle = [
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

      assert.equal(sudoku.generateCell(puzzle, 80, [2], 0, []).length, 81);
    });

    it('should go through all available numbers until it finds a valid one', () => {
      const puzzle = [
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

      assert.equal(sudoku.generateCell(puzzle, 80, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0, [])[80], 2);
    });

    it('should find the next cell after filling the current one', () => {
      const puzzle = [
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

      assert.equal(sudoku.generateCell(puzzle, 80, [6, 2], 0, [])[80], 2);
    });

    // eslint-disable-next-line func-names
    it('should shuffle numbers array every row', sinonTest(function () {
      const puzzle = [
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

      const shuffleArraySpy = this.spy(sudoku, 'shuffleArray');

      sudoku.generateCell(puzzle, 80, [1, 2, 3, 4, 5, 6, 7, 8, 9], 1, []);

      assert.isTrue(shuffleArraySpy.called);
    }));

    it('should respect the value for a static cell when it encounters one', () => {
      const puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, undefined, 6
      ];

      assert.equal(
        sudoku.generateCell(
          puzzle,
          78,
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          0,
          [],
          [78]
        )[79],
        6
      );
    });

    it('should respect the value for a static cell when it encounters one when backtracking', () => {
      const puzzle = [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 2, undefined, 6
      ];

      assert.equal(
        sudoku.generateCell(
          puzzle,
          78,
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          0,
          [{ numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9], index: 1 }],
          [78]
        )[79],
        6
      );
    });

    it('should return an empty array when a puzzle can not be solved because of bad static cells', () => {
      const puzzle = [
        undefined, 2, 3, 4, 5, 6, 7, 8, 9,
        1
      ];

      assert.equal(
        sudoku.generateCell(
          puzzle,
          0,
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          0,
          [],
          [1, 2, 3, 4, 5, 6, 7, 8, 9]
        ).length,
        0
      );
    });

    it('should backtrack and change the previous cell when no numbers can be found for the current cell', () => {
      const puzzle = [
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

      assert.equal(
        sudoku.generateCell(
          puzzle,
          80,
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          0,
          [{ numbers: [2, 5, 6], index: 0 }]
        )[79],
        6
      );
    });
  });
});
