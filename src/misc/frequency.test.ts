import { describe, test, expect } from 'bun:test';
import { frequencies } from './frequency';

describe('Frequency calculator', () => {
  test('calculates the frequency of an empty string', () => {
    expect(frequencies('')).toEqual(new Map());
  });

  test('calculates the frequency of a single character', () => {
    const freq = frequencies('A');
    expect(freq.size).toBe(1);
    expect(freq.get('A')).toBe(1);
  });

  test('calculates the frequency of a string containing the same character', () => {
    const freq = frequencies('AAAA');
    expect(freq.size).toBe(1);
    expect(freq.get('A')).toBe(4);
  });

  test('calculates the frequency of a string containing three different characters', () => {
    const freq = frequencies('ABBCCC');
    expect(freq.size).toBe(3);
    expect(freq.get('A')).toBe(1);
    expect(freq.get('B')).toBe(2);
    expect(freq.get('C')).toBe(3);
  });
});
