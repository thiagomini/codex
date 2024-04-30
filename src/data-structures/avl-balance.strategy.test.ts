import { describe, expect, test } from 'bun:test';
import { BSTree } from './binary-search-tree';
import { balance } from './avl-balance.strategy';

describe('AVL Balance Strategy', () => {
  describe('tree of height 2', () => {
    test('perform left-rotation when balance factor is -2', () => {
      // Arrange
      const bst = new BSTree();
      bst.addMany(2, 1, 0);

      // Act
      balance(bst);

      // Assert
      const root = bst.root;
      expect(root?.isRoot()).toBeTrue();
      expect(root).toEqual(node({ value: 1, left: 0, right: 2 }));
    });
    test.todo('perform right-rotation when balance factor is +2');
  });
});

function node({
  value,
  parent,
  left,
  right,
}: {
  value: number;
  parent?: number;
  left?: number;
  right?: number;
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
  return expect.objectContaining(expectedValue);
}
