import { Queue } from '../data-structures/queue';

type Graph = Record<string, string[]>;

export function breadthSearch(
  graph: Graph,
  start: string,
  end: string
): boolean {
  const neighborsToSearch = new Queue<string>();
  const outNeighbors = graph[start] ?? [];
  for (const n of outNeighbors) {
    neighborsToSearch.enqueue(n);
  }
  const visited = new Set();

  while (neighborsToSearch.size > 0) {
    const nextToCheck = neighborsToSearch.dequeue();
    visited.add(nextToCheck);
    if (nextToCheck === end) return true;

    const nextOutNeighbors = graph[nextToCheck ?? ''] ?? [];
    nextOutNeighbors
      .filter((n) => !visited.has(n))
      .forEach((n) => neighborsToSearch.enqueue(n));
  }

  return false;
}
