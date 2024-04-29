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

  test('decodes an encoded string', () => {
    const plainString = 'BCAADDDCCACACAC'; // 8 bits * 15 characters = 120 bits;
    const encodedTree = huffmanEncode(plainString);

    expect(encodedTree.decode()).toEqual(
      '100 0 11 11 101 101 101 0 0 11 0 11 0 11 0'
    );
  });
});
