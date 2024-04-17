export function sum(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers[0] + sum(numbers.slice(1));
}

export function count(elements: unknown[]): number {
  return elements.length === 0 ? 0 : 1 + count(elements.slice(1));
}