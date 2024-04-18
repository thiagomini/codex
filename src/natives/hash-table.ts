export class HashTable {
  private values: unknown[] = [];
  private count = 0;

  public get(key: string): unknown {
    return this.values[this.hash(key)];
  }

  public set(key: string, value: unknown) {
    this.store(key, value);
    this.count++;
  }

  public delete(key: string): unknown | undefined {
    const hashedKey = this.hash(key);
    const value = this.values[hashedKey];
    if (value === undefined) return;

    this.values[hashedKey] = undefined;
    return value;
  }

  get size() {
    return this.count;
  }

  private store(key: string, value: unknown) {
    const hashedKey = this.hash(key);
    this.values[hashedKey] = value;
  }

  private hash(key: string): number {
    return key.length;
  }
}
