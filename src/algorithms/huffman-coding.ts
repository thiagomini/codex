import { PriorityQueue } from '../data-structures/priority.queue';
import { frequencies } from '../misc/frequency';

export function huffmanEncode(string: string) {
  const freq = Array.from(frequencies(string));
  const queue = new PriorityQueue<string | number>();
  for (const [char, priority] of freq) {
    queue.enqueue(char, priority);
  }
  const tree: Record<string | number, (string | number)[]> = {};
  let root: number;

  while (queue.size > 0) {
    const lowest = queue.dequeue();
    const secondLowest = queue.dequeue();
    if (lowest && secondLowest) {
      const sum = lowest.priority + secondLowest.priority;
      tree[sum] = [lowest.value, secondLowest.value];
      queue.enqueue(sum, sum);
    } else {
      root = lowest?.value as number;
    }
  }

  return {
    toObject() {
      const charCodes: Record<string, string> = calculateCodes(tree, root);
      return charCodes;
    },
  };
}

function calculateCodes(
  tree: Record<string | number, (string | number)[]>,
  node: string | number | (string | number)[],
  binString: string = ''
) {
  if (node === undefined) {
    return {};
  }

  if (typeof node === 'string') {
    return {
      [node]: binString,
    };
  }

  const [l, r] = typeof node === 'number' ? tree[node] ?? [] : node;

  const charCodes: Record<string, string> = {};
  Object.assign(charCodes, calculateCodes(tree, l, binString + '0'));
  Object.assign(charCodes, calculateCodes(tree, r, binString + '1'));
  return charCodes;
}
