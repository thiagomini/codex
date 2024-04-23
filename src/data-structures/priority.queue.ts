import { HashTable } from './hash-table';

export class PriorityQueue<T = unknown> {
  private readonly queue: { value: T; priority: number }[] = [];

  public enqueue(value: T, priority: number): void {
    this.queue.push({ value, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  public dequeue(): T | undefined {
    return this.queue.shift()?.value;
  }

  public get size() {
    return this.queue.length;
  }
}
