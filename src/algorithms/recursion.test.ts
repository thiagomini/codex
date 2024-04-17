import { describe, test, expect } from 'bun:test';
import { sum } from './recursion';

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
});
