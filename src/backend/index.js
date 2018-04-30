const express = require('express');
const path = require('path');
const sudoku = require('./sudoku');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../public')));

app.get(
  '/board',
  (request, response) => response.send('Sudoku')
);

app.get(
  '/api',
  (request, response) => {
    const queryParams = request.query || {};
    const staticCells = {};

    Object.keys(queryParams).forEach((key) => {
      const parsedKey = parseInt(key, 10);

      if (!Number.isNaN(parsedKey)) {
        const parsedValue = parseInt(queryParams[key], 10);

        if (!Number.isNaN(parsedValue)) {
          staticCells[parsedKey] = parsedValue;
        }
      }
    });

    return response.send(sudoku.createPuzzle({ staticCells }));
  }
);

app.listen(
  8080,
  () => console.log('sudoku app listening on port 8080!')
);
