import type { BSTree } from './binary-search-tree';

export function balance(tree: BSTree): void {
  const root = tree.root;
  const leftMost = root?.left?.left;

  if (root?.left) {
    const newRoot = root.left.withRightChild(root).asRoot();
    tree.root = newRoot;
    if (leftMost) {
      leftMost.parent = newRoot;
    }
  }
}
