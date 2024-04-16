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
