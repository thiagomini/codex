import { describe, test, expect } from 'bun:test';

describe('Array', () => {
  test('should remove from few elements with O(1)', () => {
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const middleIndex = 4;
    console.time('slice(small)');
    elements.slice(0, middleIndex).concat(middleIndex + 1);
    console.timeEnd('slice(small)');
  });

  test('should remove from many elements with O(1)', () => {
    const randomListOfManyNumbers = Array.from({ length: 1e6 }, () =>
      Math.floor(Math.random() * 1000)
    );
    const middleIndex = Math.floor(randomListOfManyNumbers.length / 2);
    console.time('slice(big)');
    randomListOfManyNumbers.slice(0, middleIndex).concat(middleIndex + 1);
    console.timeEnd('slice(big)');
  });
});
