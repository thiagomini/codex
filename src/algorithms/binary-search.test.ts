import { expect, test, describe } from 'bun:test';
import { binarySearch, binarySearchIterative } from './binary-search';

describe('Binary Search', () => {
  describe('recursive', () => {
    test('returns the index of the first element of a sorted array', () => {
      expect(binarySearch([10, 20, 30], 10)).toBe(0);
    });

    test('returns the index of the last element of a sorted array', () => {
      expect(binarySearch([10, 20, 30], 30)).toBe(2);
    });

    test('returns the index of the middle element of a sorted array', () => {
      expect(binarySearch([10, 20, 30], 20)).toBe(1);
    });

    expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toBe(4);

    test('returns null when not found', () => {
      expect(binarySearch([10, 20, 30], 40)).toBeNull();
    });
  });

  describe('iterative', () => {
    test('returns the index of the first element of a sorted array', () => {
      expect(binarySearchIterative([10, 20, 30], 10)).toBe(0);
    });

    test('returns the index of the last element of a sorted array', () => {
      expect(binarySearchIterative([10, 20, 30], 30)).toBe(2);
    });

    test('returns the index of the middle element of a sorted array', () => {
      expect(binarySearchIterative([10, 20, 30], 20)).toBe(1);
    });

    test('returns the index of the middle element of a sorted array', () => {
      expect(binarySearchIterative([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toBe(4);
    });

    test('returns null when not found', () => {
      expect(binarySearchIterative([10, 20, 30], 40)).toBeNull();
    });
  });
});
