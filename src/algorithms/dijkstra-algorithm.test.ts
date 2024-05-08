import { describe, test, expect } from 'bun:test';
import { dijkstra, type Graph } from './dijkstra-algorithm';

describe('Dijkstra algorithm', () => {
  test('finds the shortest path for a single edge', () => {
    const graph: Graph = [['a', 'b', 10]];
    expect(dijkstra(graph, 'a', 'b')).toEqual({ cost: 10, path: ['a', 'b'] });
  });
  test('finds the shortest path for a straight path', () => {
    const graph: Graph = [
      ['a', 'b', 10],
      ['b', 'c', 5],
    ];
    expect(dijkstra(graph, 'a', 'c')).toEqual({
      cost: 15,
      path: ['a', 'b', 'c'],
    });
  });
  test('finds the shortest path for a non cyclical graph', () => {
    /**
     * ```mermaid
     * graph LR;
     *  start -->|6| a;
     *  start -->|2| b;
     *  b -->|3| a;
     *  b -->|5| finish;
     *  a -->|1| finish;
     *```
     */
    const graph: Graph = [
      ['start', 'a', 6],
      ['start', 'b', 2],
      ['b', 'a', 3],
      ['b', 'finish', 5],
      ['a', 'finish', 1],
    ];
    expect(dijkstra(graph, 'start', 'finish')).toEqual({
      cost: 6,
      path: ['start', 'b', 'a', 'finish'],
    });
  });
});
