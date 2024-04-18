import { describe, test } from 'bun:test';

describe('Set', () => {
  test('should remove from few elements with O(1)', () => {
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const aSet = new Set(elements);
    console.time('(set)small');
    aSet.delete(5);
    console.timeEnd('(set)small');
  });

  test('should remove from many elements with O(1)', () => {
    const randomListOfManyNumbers = Array.from({ length: 1e6 }, () =>
      Math.floor(Math.random() * 1000)
    );
    const aSet = new Set(randomListOfManyNumbers);
    const middle = Math.floor(randomListOfManyNumbers.length / 2);
    const middleElement = randomListOfManyNumbers[middle];
    console.time('(set)big');
    aSet.delete(middleElement);
    console.timeEnd('(set)big');
  });
});
