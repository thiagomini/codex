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
    expect(root?.left?.value).toBe(3);
    expect(root?.right?.value).toBe(15);
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
      aTree.addMany(1, 0);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({ value: 1 }),
        expect.objectContaining({ value: 0 }),
      ]);
    });
    test('iterates a 1-child-right tree', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.addMany(1, 2);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({ value: 1 }),
        expect.objectContaining({ value: 2 }),
      ]);
    });
    test('iterates a subtree with balancing factor of -2', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.addMany(4, 3, 5, 1, 0);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({ value: 4 }),
        expect.objectContaining({ value: 3 }),
        expect.objectContaining({ value: 1 }),
        expect.objectContaining({ value: 0 }),
        expect.objectContaining({ value: 5 }),
      ]);
    });
    test('iterates a subtree with balancing factor of +2', () => {
      // Arrange
      const aTree = new BSTree();
      aTree.addMany(4, 3, 5, 6, 7);

      // Act
      const asArray = [...aTree];

      // Assert
      expect(asArray).toEqual([
        expect.objectContaining({ value: 4 }),
        expect.objectContaining({ value: 3 }),
        expect.objectContaining({ value: 5 }),
        expect.objectContaining({ value: 6 }),
        expect.objectContaining({ value: 7 }),
      ]);
    });
  });

  describe('node height', () => {
    test('height of a root-only node is 0', () => {
      const bst = new BSTree();

      const node = bst.add(1);

      expect(node.height).toBe(0);
    });
    test('height of a root with one left and one right child is 1', () => {
      const bst = new BSTree();
      const root = bst.add(1);
      bst.addMany(0, 2);

      expect(root.height).toBe(1);
    });
    test('height of a root with one left grand-child is 2', () => {
      const bst = new BSTree();
      const root = bst.add(1);
      bst.addMany(0, -1, 2);

      expect(root.height).toBe(2);
    });

    test('height of each node is the max(left, right) + 1', () => {
      // Tree representation:
      /**
        6
       / \
      /   \
     3     8
    / \   / \
   1   4 7   10
             /
            9
    */
      const bst = new BSTree();
      bst.addMany(6, 3, 8, 1, 4, 7, 10, 9);

      expect(bst.find(6)?.height).toBe(3);
      expect(bst.find(3)?.height).toBe(1);
      expect(bst.find(8)?.height).toBe(2);
      expect(bst.find(1)?.height).toBe(0);
      expect(bst.find(4)?.height).toBe(0);
      expect(bst.find(7)?.height).toBe(0);
      expect(bst.find(10)?.height).toBe(1);
      expect(bst.find(9)?.height).toBe(0);
    });
  });

  describe('node balance factor', () => {
    test('balance factor of a root-only node is 0', () => {
      const bst = new BSTree();

      const node = bst.add(1);

      expect(node.balanceFactor()).toBe(0);
    });
    test('balance factor of a root with one left and one right child is 0', () => {
      const bst = new BSTree();
      const root = bst.add(1);
      bst.addMany(0, 2);

      expect(root.balanceFactor()).toBe(0);
    });
    test('balance factor of a root with one left grand-child is -2', () => {
      const bst = new BSTree();
      bst.addMany(2, 1, 0);

      expect(bst.root?.balanceFactor()).toBe(-2);
    });

    test('balance factor of a root with one right grand-child is +2', () => {
      const bst = new BSTree();
      bst.addMany(0, 1, 2);

      expect(bst.root?.balanceFactor()).toBe(2);
    });

    test('balance factor of each node is the h(right) - h(left)', () => {
      // Tree representation:
      /**
        6
       / \
      /   \
     3     8
    / \   / \
   1   4 7   10
             /
            9
    */
      const bst = new BSTree();
      bst.addMany(6, 3, 8, 1, 4, 7, 10, 9);

      expect(bst.find(6)?.balanceFactor()).toBe(1);
      expect(bst.find(3)?.balanceFactor()).toBe(0);
      expect(bst.find(8)?.balanceFactor()).toBe(1);
      expect(bst.find(1)?.balanceFactor()).toBe(0);
      expect(bst.find(4)?.balanceFactor()).toBe(0);
      expect(bst.find(7)?.balanceFactor()).toBe(0);
      expect(bst.find(10)?.balanceFactor()).toBe(-1);
      expect(bst.find(9)?.balanceFactor()).toBe(0);
    });
  });
});
