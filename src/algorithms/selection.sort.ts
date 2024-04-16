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

export function selectionSortOpt(list: number[], order: 'ASC' | 'DESC') {
  debugger;
  const availableIndexesMap = new Set<number>(list.map((_n, i) => i));
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