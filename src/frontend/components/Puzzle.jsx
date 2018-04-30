import Got from 'got';
import React, { Component } from 'react';
import Square from './Square';

class Puzzle extends Component {
  static renderSquare(index, number) {
    return <Square key={index} number={number} />;
  }

  constructor() {
    super();

    this.state = {
      isLoading: true,
      cells: new Array(81).fill(0)
    };
  }

  componentDidMount() {
    Got('http://localhost:8080/api', { json: true })
      .then((response) => {
        this.setState({ isLoading: false });
        this.setState({ cells: response.body });
      });
  }

  render() {
    const board = [];
    const spinner = <div className="loader" />;

    if (!this.state.isLoading) {
      for (let i = 0; i < 9; i += 1) {
        const row = [];

        for (let j = 0; j < 9; j += 1) {
          row.push(Puzzle.renderSquare((i * 9) + j, this.state.cells[(i * 9) + j]));
        }

        board.push(<div className="board-row" key={i}>{row}</div>);
      }
    }

    return (
      <div className="ui">
        <div className="board">
          {this.state.isLoading ? spinner : board}
        </div>
      </div>
    );
  }
}

export default Puzzle;
