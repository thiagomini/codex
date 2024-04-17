/**
 * Selects the Max or Min values for each iteration and put it in the results array.
 * @complexity O(n²)
 */
export function selectionSort(list: number[], order: 'ASC' | 'DESC'): number[] {
  const result: number[] = [];
  let copy = structuredClone(list);

  while (result.length < list.length) {
    let indexOfMax = 0;
    for (let i = 0; i < copy.length; i++) {
      const currentValue = copy[i];
      const maxOrMinValue = copy[indexOfMax];
      if (
        (order === 'DESC' && currentValue >= maxOrMinValue) ||
        (order === 'ASC' && currentValue <= maxOrMinValue)
      ) {
        indexOfMax = i;
      }
    }
    const maxValue = copy[indexOfMax];
    copy = copy.slice(0, indexOfMax).concat(copy.slice(indexOfMax + 1));
    result.push(maxValue);
  }

  return result;
}

// Interestingly, this "Optimized" version of selection sort takes more time than the "naive" implementation.
// I thought that copying the array and mutating the "copy" every time would be more expensive than using a Set,
// but that doesn't seem to be the case. Would that be a quirk of bun?
export function selectionSortOpt(list: number[], order: 'ASC' | 'DESC') {
  const availableIndexesMap = new Set<number>();
  for (let i = 0; i < list.length; i++) {
    availableIndexesMap.add(i);
  }

  const sorted: number[] = [];

  while (sorted.length < list.length) {
    let indexOfMaxOrMin = -1;
    let maxOrMinValue = order === 'ASC' ? Infinity : -Infinity;

    for (const index of availableIndexesMap) {
      if (availableIndexesMap.size === 1) {
        indexOfMaxOrMin = index;
      }
      const valueAtIndex = list[index];
      if (
        (order === 'DESC' && valueAtIndex >= maxOrMinValue) ||
        (order === 'ASC' && valueAtIndex <= maxOrMinValue)
      ) {
        indexOfMaxOrMin = index;
        maxOrMinValue = list[index];
      }
    }

    sorted.push(list[indexOfMaxOrMin]);
    availableIndexesMap.delete(indexOfMaxOrMin);
  }

  return sorted;
}
