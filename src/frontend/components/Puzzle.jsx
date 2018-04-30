import Got from 'got';
import React, { Component } from 'react';
import Square from './Square';

class Puzzle extends Component {
  static getPuzzleFromServer(success, params = {}) {
    Got('http://localhost:8080/api', { query: params, json: true }).then(success);
  }

  constructor() {
    super();

    this.state = {
      isLoading: true,
      cells: new Array(81).fill(0),
      staticCells: {}
    };

    this.reloadPuzzle = this.reloadPuzzle.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
  }

  componentDidMount() {
    Puzzle.getPuzzleFromServer((response) => {
      this.setState({ isLoading: false });
      this.setState({ cells: response.body });
    });
  }

  toggleCell(index, number) {
    const { staticCells } = this.state;

    if (Object.prototype.hasOwnProperty.call(staticCells, index)) {
      delete staticCells[index];
    } else {
      staticCells[index] = number;
    }

    this.setState({ staticCells });
  }

  reloadPuzzle() {
    this.setState({ isLoading: true });

    const params = {};
    Object.keys(this.state.staticCells).forEach((key) => {
      params[key] = this.state.staticCells[key];
    });

    Puzzle.getPuzzleFromServer(
      (response) => {
        this.setState({ isLoading: false });
        this.setState({ cells: response.body });
      },
      params
    );
  }

  renderSquare(index, number) {
    return (
      <Square
        key={index}
        number={number}
        isActive={Object.prototype.hasOwnProperty.call(this.state.staticCells, index)}
        clickHandler={this.toggleCell.bind(this, index, number)}
      />
    );
  }

  render() {
    const board = [];
    const spinner = <div className="loader" />;

    if (!this.state.isLoading) {
      for (let i = 0; i < 9; i += 1) {
        const row = [];

        for (let j = 0; j < 9; j += 1) {
          row.push(this.renderSquare((i * 9) + j, this.state.cells[(i * 9) + j]));
        }

        board.push(<div className="board-row" key={i}>{row}</div>);
      }
    }

    return (
      <div className="ui">
        <div className="board">
          {this.state.isLoading ? spinner : board}
        </div>

        <button className="reload" onClick={this.reloadPuzzle}>New Puzzle</button>
      </div>
    );
  }
}

export default Puzzle;
