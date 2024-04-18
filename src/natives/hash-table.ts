export type HashFunction = (key: string) => number;

const defaultHashFunction: HashFunction = (key) => {
  let index = 0;
  for (let i = 0; i < key.length; i++) {
    index += key.charCodeAt(i);
  }
  return index % 127;
};

export class HashTable {
  constructor(
    private readonly hashFunction: HashFunction = defaultHashFunction
  ) {}

  private values: Array<[string, unknown][]> = new Array(127).fill([]);
  private count = 0;

  public get(key: string): unknown {
    return this.values[this.hash(key)].find(([k]) => k === key)?.[1];
  }

  public set(key: string, value: unknown) {
    this.store(key, value);
    this.count++;
  }

  public delete(key: string): unknown | undefined {
    const hashedKey = this.hash(key);
    const existingKeyIndex = this.values[hashedKey].findIndex(
      ([k]) => k === key
    );
    if (existingKeyIndex < 0) return;
    const value = this.values[hashedKey]?.[existingKeyIndex][1];

    this.values[hashedKey] = this.values[hashedKey]
      .slice(0, existingKeyIndex)
      .concat(this.values[hashedKey].slice(existingKeyIndex + 1));
    return value;
  }

  get size() {
    return this.count;
  }

  private store(key: string, value: unknown) {
    const hashedKey = this.hash(key);

    const existingKeyIndex = this.values[hashedKey].findIndex(
      ([k]) => k === key
    );

    if (existingKeyIndex >= 0) {
      this.values[hashedKey][existingKeyIndex][1] = value;
    } else {
      this.values[hashedKey].push([key, value]);
    }
  }

  private hash(key: string): number {
    return this.hashFunction(key);
  }
}
