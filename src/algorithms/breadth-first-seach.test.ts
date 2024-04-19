import { describe, test, expect } from 'bun:test';
import { breadthSearch } from './breadth-first-search';

describe('Breadth-first search', () => {
  const directedGraph = Object.freeze({
    you: ['alice', 'claire', 'bob'],
    alice: ['peggy'],
    claire: ['thom', 'jonny'],
    bob: ['anuj', 'peggy'],
  });

  test('returns true when there is a path between two nodes (1 level)', () => {
    expect(breadthSearch(directedGraph, 'you', 'alice')).toBeTrue();
  });
  test('returns true when there is a path between two nodes (2 levels)', () => {
    expect(breadthSearch(directedGraph, 'you', 'jonny')).toBeTrue();
  });
  test('returns false when there is no path between two nodes', () => {
    expect(breadthSearch(directedGraph, 'jonny', 'thom')).toBeFalse();
  });
  test('handles circular reference', () => {
    const circularGraph = {
      you: ['alice'],
      alice: ['you'],
    };
    expect(breadthSearch(circularGraph, 'you', 'thom')).toBeFalse();
  });
});
