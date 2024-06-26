import { describe, test, expect } from 'bun:test';
import { PriorityQueue } from './priority.queue';

describe('Priority Queue', () => {
  test('enqueues and dequeues an element', () => {
    const queue = new PriorityQueue();
    queue.enqueue('A', 1);
    expect(queue.dequeue()).toEqual({ value: 'A', priority: 1 });
  });

  test('dequeues elements in priority order', () => {
    const queue = new PriorityQueue();
    queue.enqueue('A', 3);
    queue.enqueue('B', 1);
    queue.enqueue('C', 2);

    expect(queue.dequeue()).toEqual({ value: 'B', priority: 1 });
    expect(queue.dequeue()).toEqual({ value: 'C', priority: 2 });
    expect(queue.dequeue()).toEqual({ value: 'A', priority: 3 });
  });

  test('handles collision in FIFO order', () => {
    const queue = new PriorityQueue();
    queue.enqueue('A', 1);
    queue.enqueue('B', 1);

    expect(queue.dequeue()).toEqual({ value: 'A', priority: 1 });
    expect(queue.dequeue()).toEqual({ value: 'B', priority: 1 });
  });

  test('maintain order of old values', () => {
    const queue = new PriorityQueue();
    queue.enqueue('A', 10);
    queue.enqueue('B', 20);
    queue.enqueue('C', 20);
    queue.dequeue(); // Removes A
    queue.enqueue('D', 5);

    expect(queue.dequeue()).toEqual({ value: 'D', priority: 5 });
    expect(queue.dequeue()).toEqual({ value: 'B', priority: 20 });
    expect(queue.dequeue()).toEqual({ value: 'C', priority: 20 });
  });

  test('dequeues undefined for an empty queue', () => {
    const queue = new PriorityQueue();

    expect(queue.dequeue()).toBeUndefined();
  });

  test('keep track of size', () => {
    const queue = new PriorityQueue();
    queue.enqueue('A', 1);
    queue.enqueue('B', 2);
    queue.enqueue('C', 3);
    queue.enqueue('D', 4);
    queue.dequeue();

    expect(queue.size).toBe(3);
  });
});
