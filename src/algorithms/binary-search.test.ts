import { expect, test, describe } from 'bun:test';
import { binarySearch } from './binary-search';

describe('Binary Search', () => {
  test('returns the index of the first element of a sorted array', () => {
    expect(binarySearch([10, 20, 30], 10)).toBe(0);
  });

  test('returns the index of the last element of a sorted array', () => {
    expect(binarySearch([10, 20, 30], 30)).toBe(2);
  });

  test('returns the index of the middle element of a sorted array', () => {
    expect(binarySearch([10, 20, 30], 20)).toBe(1);
  });
});
