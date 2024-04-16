import { describe, test, expect } from 'bun:test';
import { selectionSort } from './selection.sort';
describe('Selection Sort', () => {
  test('sorts in descending order', () => {
    const list = [20, 10, 30];
    expect(selectionSort(list, 'DESC')).toEqual([30, 20, 10]);
  });
});
