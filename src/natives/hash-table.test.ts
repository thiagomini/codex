import { describe, test, expect } from 'bun:test';
import { HashTable } from './hash-table';

describe('Hash Table', () => {
  test('should return undefined when key is not present', () => {
    const aHashTable = new HashTable();
    expect(aHashTable.get('nonexistent-key')).toBeUndefined();
  });

  test('should return value when key is present', () => {
    const aHashTable = new HashTable();
    aHashTable.set('key', 1);

    expect(aHashTable.get('key')).toBe(1);
  });

  test('should override value when key is set twice', () => {
    const aHashTable = new HashTable();
    aHashTable.set('key', 1);
    aHashTable.set('key', 2);

    expect(aHashTable.get('key')).toBe(2);
  });

  test('should be able to save many key-value pairs', () => {
    const aHashTable = new HashTable();
    aHashTable.set('key', 1);
    aHashTable.set('another', 2);

    expect(aHashTable.get('key')).toBe(1);
    expect(aHashTable.get('another')).toBe(2);
  });

  test('should return the value when deleting an existing key', () => {
    const aHashTable = new HashTable();
    aHashTable.set('key', 1);

    expect(aHashTable.delete('key')).toBe(1);
    expect(aHashTable.get('key')).toBeUndefined();
  });

  test('should return undefined when deleting a nonexistent key', () => {
    const aHashTable = new HashTable();

    expect(aHashTable.delete('key')).toBeUndefined();
  });

  test('should keep track of number of items', () => {
    const aHashTable = new HashTable();
    aHashTable.set('key', 1);
    aHashTable.set('another', 2);
    aHashTable.set('yet-another', 3);

    expect(aHashTable.size).toBe(3);
  });
});
