import type { BSTree } from './binary-search-tree';

export function balance(tree: BSTree, nodeValue: number): void {
  const nodeToBalance = tree.find(nodeValue);
  const parent = nodeToBalance?.parent;
  const typeOfChild = parent?.left === nodeToBalance ? 'left' : 'right';
  const leftMost = nodeToBalance?.left?.left;
  const rightMost = nodeToBalance?.right?.right;

  if (nodeToBalance?.left && leftMost) {
    const nodeUpdated = nodeToBalance.left
      .withRightChild(nodeToBalance)
      .withLeftChild(leftMost)
      .asRoot();

    if (parent && typeOfChild === 'left') {
      parent.left = nodeUpdated;
    } else if (parent) {
      parent.right = nodeUpdated;
    } else {
      tree.root = nodeUpdated;
    }
  } else if (nodeToBalance?.right && rightMost) {
    const nodeUpdated = nodeToBalance.right
      .withLeftChild(nodeToBalance)
      .withRightChild(rightMost);

    if (parent && typeOfChild === 'left') {
      parent.left = nodeUpdated;
    } else if (parent) {
      parent.right = nodeUpdated;
    } else {
      tree.root = nodeUpdated;
    }
  }
}
