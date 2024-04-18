export class HashTable {
  private values: unknown[] = new Array(127);
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
    let index = 0;
    for (let i = 0; i < key.length; i++) {
      index += key.charCodeAt(i);
    }
    return index % 127;
  }
}
