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
