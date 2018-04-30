import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import Puzzle from '../src/frontend/components/Puzzle';
import Square from '../src/frontend/components/Square';

describe('<Puzzle />', () => {
  it('should display spinner until api responds', () => {
    const getPuzzleFromServerStub = stub(Puzzle, 'getPuzzleFromServer');
    getPuzzleFromServerStub.returns(undefined);

    const wrapper = shallow(<Puzzle />);
    const result = wrapper.find('.loader');

    getPuzzleFromServerStub.restore();
    expect(result).to.have.length(1);
  });

  it('should render 81 squares', () => {
    const getPuzzleFromServerStub = stub(Puzzle, 'getPuzzleFromServer');
    getPuzzleFromServerStub.callsArgWith(0, {
      body: [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 6, 2
      ]
    });

    const wrapper = shallow(<Puzzle />);
    const result = wrapper.find(Square);

    getPuzzleFromServerStub.restore();
    expect(result).to.have.length(81);
  });

  it('should process', () => {
    const getPuzzleFromServerStub = stub(Puzzle, 'getPuzzleFromServer');
    getPuzzleFromServerStub.callsArgWith(0, {
      body: [
        4, 5, 6, 7, 1, 3, 2, 9, 8,
        1, 2, 9, 6, 8, 4, 5, 3, 7,
        7, 3, 8, 2, 9, 5, 6, 4, 1,
        9, 7, 4, 1, 5, 2, 3, 8, 6,
        5, 1, 3, 8, 7, 6, 4, 2, 9,
        8, 6, 2, 4, 3, 9, 7, 1, 5,
        2, 4, 1, 9, 6, 7, 8, 5, 3,
        6, 8, 5, 3, 2, 1, 9, 7, 4,
        3, 9, 7, 5, 4, 8, 1, 6, 2
      ]
    });

    const onButtonClick = spy(Puzzle.prototype, 'reloadPuzzle');
    const wrapper = shallow(<Puzzle />);

    wrapper.find('button').simulate('click');

    getPuzzleFromServerStub.restore();
    onButtonClick.restore();

    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
