import { describe, test, expect } from 'bun:test';
import { BinaryTree } from './binary-tree';

describe('Binary Tree', () => {
  test('create with a numeric root node', () => {
    const aBinaryTree = new BinaryTree(1);
    const node = aBinaryTree.nodeWithValue(1);
    expect(node?.isRoot()).toBeTrue();
  });

  test('create with a string root node', () => {
    const aBinaryTree = new BinaryTree('root');
    const node = aBinaryTree.nodeWithValue('root');
    expect(node?.isRoot()).toBeTrue();
  });

  test('add right child to the root', () => {
    // Arrange
    const aBinaryTree = new BinaryTree('root');

    // Act
    aBinaryTree.appendRightChildToNode(2, 'root');

    // Assert
    const node = aBinaryTree.nodeWithValue(2);
    expect(node).toBeTruthy();
    expect(node?.value).toBe(2);
  });

  test('add left child to the root', () => {
    // Arrange
    const aBinaryTree = new BinaryTree('root');

    // Act
    aBinaryTree.appendLeftChildToNode(2, 'root');

    // Assert
    const node = aBinaryTree.nodeWithValue(2);
    expect(node).toBeTruthy();
    expect(node?.value).toBe(2);
  });

  test('adding right child also updates the parent node', () => {
    // Arrange
    const aBinaryTree = new BinaryTree('root');

    // Act
    aBinaryTree.appendRightChildToNode(2, 'root');

    // Assert
    const node = aBinaryTree.nodeWithValue('root');
    expect(node?.right).toBe(2);
  });

  test('adding left child also updates the parent node', () => {
    // Arrange
    const aBinaryTree = new BinaryTree('root');

    // Act
    aBinaryTree.appendLeftChildToNode(2, 'root');

    // Assert
    const node = aBinaryTree.nodeWithValue('root');
    expect(node?.left).toBe(2);
  });

  describe('leaf nodes', () => {
    test('a leaf node does not have children', () => {
      // Arrange
      const aBinaryTree = new BinaryTree('root');
      const rootNode = aBinaryTree.nodeWithValue('root');

      // Act
      const isLeaf = rootNode?.isLeaf();

      // Assert
      expect(isLeaf).toBeTrue();
    });

    test('a node with a right child is not a leaf', () => {
      // Arrange
      const aBinaryTree = new BinaryTree('root');
      aBinaryTree.appendRightChildToNode('right', 'root');
      const rootNode = aBinaryTree.nodeWithValue('root');

      // Act
      const isLeaf = rootNode?.isLeaf();

      // Assert
      expect(isLeaf).toBeFalse();
    });

    test('a node with a left child is not a leaf', () => {
      // Arrange
      const aBinaryTree = new BinaryTree('root');
      aBinaryTree.appendLeftChildToNode('left', 'root');
      const rootNode = aBinaryTree.nodeWithValue('root');

      // Act
      const isLeaf = rootNode?.isLeaf();

      // Assert
      expect(isLeaf).toBeFalse();
    });
  });
});
