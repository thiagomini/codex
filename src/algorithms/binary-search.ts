export type Index = number | null;

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

  if (numberAtMiddle === numberToFind) return middle;

  const isGreater = numberToFind > numberAtMiddle;
  const isLower = !isGreater;

  if (
    (isGreater && middle >= indexes.end) ||
    (isLower && middle <= indexes.start)
  ) {
    return null;
  }

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
