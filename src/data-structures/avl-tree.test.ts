import { describe, expect, test } from 'bun:test';
import { AVLTree } from './avl-tree';

describe('AVL Tree', () => {
  describe('tree of height 2', () => {
    test('perform left-rotation for LEFT-LEFT case', () => {
      // Arrange
      const avl = new AVLTree();

      // Act
      avl.addMany(2, 1, 0);

      // Assert
      const root = avl.root;
      expect(root).toEqual(node({ value: 1, left: 0, right: 2, height: 1 }));
    });
    test('perform right-rotation for RIGHT-RIGHT case', () => {
      // Arrange
      const avl = new AVLTree();

      // Act
      avl.addMany(2, 3, 4);

      // Assert
      const root = avl.root;
      expect(root).toEqual(node({ value: 3, left: 2, right: 4, height: 1 }));
    });
  });
});

function node({
  value,
  parent,
  left,
  right,
  height,
}: {
  value: number;
  parent?: number;
  left?: number;
  right?: number;
  height?: number;
}) {
  const expectedValue = {
    value,
  };
  parent !== undefined &&
    Object.assign(expectedValue, {
      parent: expect.objectContaining({ value: parent }),
    });

  left !== undefined &&
    Object.assign(expectedValue, {
      left: expect.objectContaining({ value: left }),
    });

  right !== undefined &&
    Object.assign(expectedValue, {
      right: expect.objectContaining({ value: right }),
    });

  height !== undefined &&
    Object.assign(expectedValue, {
      height,
    });
  return expect.objectContaining(expectedValue);
}
