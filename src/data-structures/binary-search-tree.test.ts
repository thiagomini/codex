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

  test('find a path to a node', () => {
    // Arrange
    const bst = new BSTree();
    bst.addMany(10, 3, 8, 9);

    // Act
    const pathTo9 = bst.pathTo(9);

    // Assert
    expect(pathTo9).toEqual([10, 3, 8, 9]);
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
});
