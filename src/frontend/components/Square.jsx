import React, { Component } from 'react';

class Square extends Component {
  render() {
    return (
      <div
        className={`square ${this.props.isActive ? 'active' : ''}`}
        onClick={this.props.clickHandler}
      >
        <span>{this.props.number}</span>
      </div>
    );
  }
}

export default Square;
