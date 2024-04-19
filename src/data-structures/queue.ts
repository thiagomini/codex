export class Queue<T = unknown> {
  private readonly queue: T[] = [];

  public enqueue(value: T): void {
    this.queue.push(value);
  }
  public dequeue(): T | undefined {
    return this.queue.shift();
  }

  public get size() {
    return this.queue.length;
  }
}
