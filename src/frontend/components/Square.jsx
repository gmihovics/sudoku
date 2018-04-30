import React, { Component } from 'react';

class Square extends Component {
  render() {
    return (
      <div className="square"><span>{ this.props.number }</span></div>
    );
  }
}

export default Square;
