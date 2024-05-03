import type { BSTNode, BSTree } from './binary-search-tree';

export function balance(tree: BSTree, nodeValue: number): void {
  const nodeToBalance = tree.find(nodeValue);
  const parent = nodeToBalance?.parent;
  const typeOfChild = parent?.left === nodeToBalance ? 'left' : 'right';
  const leftMost = nodeToBalance?.left?.left;
  const rightMost = nodeToBalance?.right?.right;

  let nodeUpdated: BSTNode | undefined;

  if (nodeToBalance?.left && leftMost) {
    nodeUpdated = nodeToBalance.left
      .withRightChild(nodeToBalance)
      .withLeftChild(leftMost)
      .asRoot();
  } else if (nodeToBalance?.right && rightMost) {
    nodeUpdated = nodeToBalance.right.withLeftChild(nodeToBalance);
  }

  if (parent && typeOfChild === 'left') {
    parent.left = nodeUpdated;
  } else if (parent) {
    parent.right = nodeUpdated;
  } else {
    tree.root = nodeUpdated;
  }
}
