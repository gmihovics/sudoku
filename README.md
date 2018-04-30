#Sudoku

This is a single page app and web service that returns a randomized 9x9 grid of integers in the range [1,9] that 
represents a solved Sudoku board.

##Requirements

- The entire HTTP request must return in less that 500ms
- The resultant Sudoku boards must always be valid, solved solutions according to the 
rules of the game.
- Single page app should display a progress spinner when the web page is loading a board.
- The UI will contain a button called “Reload” that will refresh the board.
- The user interface allows the user to select a cell.  When cell is selected it will be 
highlighted.
- Cell selection will act like a toggle (on/off) when it is clicked.
- If a cell is “toggled on” and the Reload button is pressed, the requested board will be 
new and randomized BUT the selected cell value will be the same

##Usage

To build and run the application use command

`npm start`


To build a docker image `sudoku-ws:level-4` run

`npm run docker`

To run the docker image run

`docker run -d -p 8080:8080 sudoku-ws:level-4`

Puzzle can be accessed at [http://localhost:8080/sudoku/board](http://localhost:8080/sudoku/board)
