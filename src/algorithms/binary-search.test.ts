import { expect, test, describe } from 'bun:test';
import { binarySearch } from './binary-search';

describe('Binary Search', () => {
  test('returns the index of the first element of a sorted array', () => {
    expect(binarySearch([10, 20, 30], 0)).toBe(0);
  });
});
