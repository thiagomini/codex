import { describe, test, expect } from 'bun:test';
import { depthFirstSearch } from './depth-first-search';

describe('Depth-first search', () => {
  const isEven = (n: number) => n % 2 === 0;

  test('Returns the root node', () => {
    const aTree = {
      root: {
        value: 2,
        children: [],
      },
    };
    expect(depthFirstSearch(aTree, isEven)).toEqual([2]);
  });
  test('Returns the left leaf first', () => {
    const aTree = {
      root: {
        value: 1,
        children: ['left', 'right'],
      },
      left: {
        value: 2,
        children: [],
      },
      right: {
        value: 4,
        children: [],
      },
    };
    expect(depthFirstSearch(aTree, isEven)).toEqual([2, 4]);
  });
  test('Returns the right leaf of the left child first', () => {
    const aTree = {
      root: {
        value: 1,
        children: ['left', 'right'],
      },
      left: {
        value: 3,
        children: ['leftLeaf', 'rightLeaf'],
      },
      right: {
        value: 4,
        children: [],
      },
      leftLeaf: {
        value: 5,
        children: [],
      },
      rightLeaf: {
        value: 8,
        children: [],
      },
    };

    expect(depthFirstSearch(aTree, isEven)).toEqual([8, 4]);
  });
});
