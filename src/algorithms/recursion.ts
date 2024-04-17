export function sum(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers[0] + sum(numbers.slice(1));
}

export function count(elements: unknown[]): number {
  return elements.length === 0 ? 0 : 1 + count(elements.slice(1));
}

export function max(numbers: number[]): number | null {
  if (numbers.length === 0) return null;
  if (numbers.length === 1) return numbers[0];

  return greaterBetweenTwo(numbers[0], max(numbers.slice(1)));
}

function greaterBetweenTwo(n1: number, n2: number | null): number {
  if (n2 === null) return n1;

  return n1 >= n2 ? n1 : n2;
}