const express = require('express');
const path = require('path');
const sudoku = require('./sudoku');

const app = express();
const port = process.env.PORT || 8080;

app.use('/sudoku/', express.static(path.resolve(__dirname, '../../public')));

app.get('/sudoku/board', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get(
  '/sudoku/api',
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
  port,
  () => console.log(`sudoku app listening on port ${port}!`)
);
