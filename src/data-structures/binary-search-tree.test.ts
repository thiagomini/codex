import { describe, expect, test } from 'bun:test';
import { BSTree } from './binary-search-tree';

describe('Binary Search Tree (BST)', () => {
  test('adds a new node', () => {
    const bst = new BSTree();

    const node = bst.add(1);

    expect(node.value).toBe(1);
  });

  test('adds many new nodes', () => {
    // Arrange
    const bst = new BSTree();

    // Act
    bst.addMany(10, 3, 15);

    // Assert
    const root = bst.find(10);
    expect(bst.size).toBe(3);
    expect(root?.left).toBe(3);
    expect(root?.right).toBe(15);
  });

  describe('leaves', () => {
    test('a leaf node does not have children', () => {
      const bst = new BSTree();
      const leaf = bst.add(1);
      expect(leaf.isLeaf()).toBeTrue();
    });

    test('a node with right child is not a leaf', () => {
      // Arrange
      const bst = new BSTree();

      // Act
      bst.addMany(1, 2);

      // Assert
      const root = bst.find(1);
      expect(root?.isLeaf()).toBeFalse();
    });

    test('a node with left child is not a leaf', () => {
      // Arrange
      const bst = new BSTree();

      // Act
      bst.addMany(2, 1);

      // Assert
      const root = bst.find(2);
      expect(root?.isLeaf()).toBeFalse();
    });

    test('a node with left and right children is not a leaf', () => {
      // Arrange
      const bst = new BSTree();

      // Act
      bst.addMany(2, 1, 3);

      // Assert
      const root = bst.find(2);
      expect(root?.isLeaf()).toBeFalse();
    });
  });

  test('find an existing node', () => {
    // Arrange
    const bst = new BSTree();
    bst.add(1);

    // Act
    const existingNode = bst.find(1);

    // Assert
    expect(existingNode?.value).toBe(1);
  });

  test('replace node', () => {
    // Arrange
    const bst = new BSTree();
    bst.add(1);

    // Act
    const node = bst.add(1);

    // Assert
    expect(node.value).toBe(1);
    expect(bst.size).toBe(1);
  });

  describe('find a path to node', () => {
    test('traversing all nodes', () => {
      // Arrange
      const bst = new BSTree();
      bst.addMany(10, 3, 8, 9);

      // Act
      const pathTo9 = bst.pathTo(9);

      // Assert
      expect(pathTo9).toEqual([10, 3, 8, 9]);
    });

    test('traversing half the nodes', () => {
      // Arrange
      const bst = new BSTree();
      bst.addMany(10, 3, 15, 9);

      // Act
      const pathTo9 = bst.pathTo(15);

      // Assert
      expect(pathTo9).toEqual([10, 15]);
    });

    test('traversing the root node only', () => {
      // Arrange
      const bst = new BSTree();
      bst.add(10);

      // Act
      const pathTo9 = bst.pathTo(10);

      // Assert
      expect(pathTo9).toEqual([10]);
    });

    test('returns empty array when there is no path', () => {
      // Arrange
      const bst = new BSTree();
      bst.add(10);

      // Act
      const pathTo9 = bst.pathTo(20);

      // Assert
      expect(pathTo9).toEqual([]);
    });
  });

  describe('iterator', () => {
    test('iterates an empty tree', () => {
      // Arrange
      const aTree = new BSTree();

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([]);
    });

    test('iterates a root-only tree', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.add(1);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({
          value: 1,
          left: undefined,
          right: undefined,
        }),
      ]);
    });
    test('iterates a 1-child-left tree', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.add(1);
      aTree.add(0);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({
          value: 1,
          left: 0,
          right: undefined,
          parent: undefined,
        }),
        expect.objectContaining({
          value: 0,
          left: undefined,
          right: undefined,
          parent: 1,
        }),
      ]);
    });
    test('iterates a 1-child-right tree', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.add(1);
      aTree.add(2);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({ value: 1, left: undefined, right: 2 }),
        expect.objectContaining({
          value: 2,
          left: undefined,
          right: undefined,
          parent: 1,
        }),
      ]);
    });
    test('iterates a subtree with balancing factor of -2', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.add(4);
      aTree.add(3);
      aTree.add(5);
      aTree.add(1);
      aTree.add(0);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({ value: 4, left: 3, right: 5 }),
        expect.objectContaining({
          value: 3,
          left: 1,
          right: undefined,
          parent: 4,
        }),
        expect.objectContaining({
          value: 1,
          left: 0,
          right: undefined,
          parent: 3,
        }),
        expect.objectContaining({
          value: 0,
          left: undefined,
          right: undefined,
          parent: 1,
        }),
        expect.objectContaining({
          value: 5,
          left: undefined,
          right: undefined,
          parent: 4,
        }),
      ]);
    });
    test('iterates a subtree with balancing factor of +2', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.add(4);
      aTree.add(3);
      aTree.add(5);
      aTree.add(6);
      aTree.add(7);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({
          value: 4,
          left: 3,
          right: 5,
          parent: undefined,
        }),
        expect.objectContaining({
          value: 3,
          left: undefined,
          right: undefined,
          parent: 4,
        }),
        expect.objectContaining({
          value: 5,
          left: undefined,
          right: 6,
          parent: 4,
        }),
        expect.objectContaining({
          value: 6,
          left: undefined,
          right: 7,
          parent: 5,
        }),
        expect.objectContaining({
          value: 7,
          left: undefined,
          right: undefined,
          parent: 6,
        }),
      ]);
    });
  });

});
