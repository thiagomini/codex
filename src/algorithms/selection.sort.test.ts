import { describe, test, expect } from 'bun:test';
import { selectionSort, selectionSortOpt } from './selection.sort';
describe('Selection Sort', () => {
  describe('naive implementation', () => {
    test('sorts in DESC order', () => {
      const list = [20, 10, 30];
      expect(selectionSort(list, 'DESC')).toEqual([30, 20, 10]);
    });

    test('sorts in ASC order', () => {
      const list = [20, 10, 30];
      expect(selectionSort(list, 'ASC')).toEqual([10, 20, 30]);
    });

    test('sorts an array with duplicate values in DESC order', () => {
      const list = [20, 10, 30, 20];
      expect(selectionSort(list, 'DESC')).toEqual([30, 20, 20, 10]);
    });

    test('sorts an array with duplicate values in ASC order', () => {
      const list = [20, 10, 30, 20];
      expect(selectionSort(list, 'ASC')).toEqual([10, 20, 20, 30]);
    });

    test('sorts an empty array in DESC order', () => {
      const list: number[] = [];
      expect(selectionSort(list, 'DESC')).toEqual([]);
    });

    test('sorts an empty array in ASC order', () => {
      const list: number[] = [];
      expect(selectionSort(list, 'ASC')).toEqual([]);
    });
  });
  describe('optimized implementation', () => {
    test('sorts in DESC order', () => {
      const list = [20, 10, 30];
      expect(selectionSortOpt(list, 'DESC')).toEqual([30, 20, 10]);
    });

    test('sorts in ASC order', () => {
      const list = [20, 10, 30];
      expect(selectionSortOpt(list, 'ASC')).toEqual([10, 20, 30]);
    });

    test('sorts an array with duplicate values in DESC order', () => {
      const list = [20, 10, 30, 20];
      expect(selectionSortOpt(list, 'DESC')).toEqual([30, 20, 20, 10]);
    });

    test('sorts an array with duplicate values in ASC order', () => {
      const list = [20, 10, 30, 20];
      expect(selectionSortOpt(list, 'ASC')).toEqual([10, 20, 20, 30]);
    });

    test('sorts an empty array in DESC order', () => {
      const list: number[] = [];
      expect(selectionSortOpt(list, 'DESC')).toEqual([]);
    });

    test('sorts an empty array in ASC order', () => {
      const list: number[] = [];
      expect(selectionSortOpt(list, 'ASC')).toEqual([]);
    });
  });
});
