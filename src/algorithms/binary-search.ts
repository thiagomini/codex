export type Index = number;

export function binarySearch(
  array: number[],
  numberToFind: number,
  indexes: {
    start: number;
    end: number;
  } = {
    start: 0,
    end: array.length,
  }
): Index {
  const middle = Math.floor((indexes.start + indexes.end) / 2);
  const numberAtMiddle = array[middle];
  console.log(`
  middle: ${middle}
  numberAtMiddle: ${numberAtMiddle}
`);
  if (numberAtMiddle === numberToFind) return middle;

  const isGreater = numberToFind > numberAtMiddle;

  console.log(`
    isGreater: ${isGreater}
  `);

  if (isGreater) {
    return binarySearch(array, numberToFind, {
      start: middle + 1,
      end: indexes.end,
    });
  } else {
    return binarySearch(array, numberToFind, {
      start: indexes.start,
      end: middle - 1,
    });
  }
}
