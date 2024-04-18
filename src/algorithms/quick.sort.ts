/**
 * Quicksort uses Divide and Conquer to sort the array.
 * Even though it has the same Big O complexity of Merge Sort, it's usually
 * faster due to the constant multiplier.
 * @complexity O(n*log(n))
 */
export function quickSort(numbers: number[]): number[] {
  if (numbers.length < 2) return numbers;
  const pivotIndex = Math.floor(numbers.length / 2);
  const pivotNumber = numbers[pivotIndex];

  const left = numbers.filter(
    (n, index) => n <= pivotNumber && index !== pivotIndex
  );
  const right = numbers.filter(
    (n, index) => n > pivotNumber && index !== pivotIndex
  );

  return [...quickSort(left), pivotNumber, ...quickSort(right)];
}
