export class Queue {
  private readonly queue: unknown[] = [];

  public enqueue(value: unknown): void {
    this.queue.push(value);
  }
  public dequeue(): unknown {
    return this.queue.shift();
  }

  public get size() {
    return this.queue.length;
  }
}
