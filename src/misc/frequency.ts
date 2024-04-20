export function frequencies(input: string): Map<string, number> {
  const result = new Map();

  for (const char of input) {
    if (result.has(char)) {
      result.set(char, result.get(char) + 1);
    } else {
      result.set(char, 1);
    }
  }

  return result;
}
