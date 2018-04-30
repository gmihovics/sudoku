import React, { Component } from 'react';

class Puzzle extends Component {
  static renderSquare(index, number) {
    return <Square key={index} number={number} />;
  }

  constructor() {
    super();

    this.state = {
      cells: new Array(81).fill(0)
    };
  }

  render() {
    const board = [];

    for (let i = 0; i < 9; i += 1) {
      const row = [];

      for (let j = 0; j < 9; j += 1) {
        row.push(Puzzle.renderSquare((i * 9) + j, this.state.cells[(i * 9) + j]));
      }

      board.push(<div className="board-row" key={i}>{row}</div>);
    }

    return (
      <div>
        {board}
      </div>
    )
  }
}

export default Puzzle;
