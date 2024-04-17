import { test, expect, describe } from 'bun:test';
import { quickSort } from './quick.sort';

describe('quick sort', () => {
  test('sorts an array with no elements', () => {
    const array: number[] = [];
    expect(quickSort(array)).toEqual([]);
  });
  test('sorts an array with one element', () => {
    const array: number[] = [10];
    expect(quickSort(array)).toEqual([10]);
  });
  test.only('sorts an array with many elements', () => {
    const array: number[] = [30, 10, 20, 50, 40];
    expect(quickSort(array)).toEqual([10, 20, 30, 40, 50]);
  });
});
