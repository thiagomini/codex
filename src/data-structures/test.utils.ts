import { expect } from 'bun:test';

export const EMPTY = Symbol.for('node:empty');

export type EmptyNode = typeof EMPTY;

export function node({
  value,
  parent,
  left,
  right,
  height,
}: {
  value: number;
  parent?: number | EmptyNode;
  left?: number | EmptyNode;
  right?: number | EmptyNode;
  height?: number;
}) {
  const expectedValue = {
    value,
  };
  parent !== undefined &&
    Object.assign(expectedValue, {
      parent: parseValue(parent),
    });

  left !== undefined &&
    Object.assign(expectedValue, {
      left: parseValue(left),
    });

  right !== undefined &&
    Object.assign(expectedValue, {
      right: parseValue(right),
    });

  height !== undefined &&
    Object.assign(expectedValue, {
      height,
    });
  return expect.objectContaining(expectedValue);
}

function parseValue(value: number | typeof EMPTY) {
  if (value === EMPTY) return undefined;
  return expect.objectContaining({ value });
}
