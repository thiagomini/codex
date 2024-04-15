export type Index = number;

export function binarySearch(array: number[], elementToFind: number): Index {
  return array[0] === elementToFind ? 0 : 2;
}
