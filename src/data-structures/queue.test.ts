import { describe, test, expect } from 'bun:test';
import { Queue } from './queue';

describe('Queue', () => {
  test('enqueues and dequeues an element', () => {
    const queue = new Queue();
    queue.enqueue(1);
    expect(queue.dequeue()).toBe(1);
  });
  test('dequeues elements in FIFO order', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });
  test('dequeues undefined for an empty queue', () => {
    const queue = new Queue();

    expect(queue.dequeue()).toBeUndefined();
  });
  test('keep track of size', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(3);
    queue.dequeue();

    expect(queue.size).toBe(3);
  });
});
