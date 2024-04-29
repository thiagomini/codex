import { describe, test, expect } from 'bun:test';
import { huffmanEncode } from './huffman-coding';

describe('Huffman Coding', () => {
  test('creates an encoding tree for a string', () => {
    const plainString = 'BCAADDDCCACACAC'; // 8 bits * 15 characters = 120 bits;

    const encodedTree = huffmanEncode(plainString);

    expect(encodedTree.toObject()).toEqual({
      C: '0',
      A: '11',
      D: '101',
      B: '100',
    });
  });
});
