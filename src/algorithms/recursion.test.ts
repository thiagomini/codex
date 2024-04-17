import { describe, test, expect } from 'bun:test';
import { count, sum } from './recursion';

describe('Recursion', () => {
  describe('sum', () => {
    test('sums up an empty array', () => {
      expect(sum([])).toEqual(0);
    });
    test('sums up an array with a single value', () => {
      expect(sum([10])).toEqual(10);
    });
    test('sums up an array with a multiple values', () => {
      expect(sum([1, 2, 3])).toEqual(6);
    });
  });

  describe('count', () => {
    test('counts the number of elements of an empty array', () => {
      expect(count([])).toBe(0);
    });
    test('counts the number of elements of an array with a single element', () => {
      expect(count([10])).toBe(1);
    });
    test('counts the number of elements of an array with many elements', () => {
      expect(count([10, 20, 30])).toBe(3);
    });
  });
});
