const express = require('express');
const app = express();

app.get(
  '/board',
  (request, response) => response.send('Sudoku')
);

app.listen(
  8080,
  () => console.log('sudoku app listening on port 8080!')
);
