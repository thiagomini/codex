export type Tree = Record<
  string,
  {
    children: string[];
    value: number;
  }
>;

type CompareFn = (n: number) => boolean;

export function depthFirstSearch(aTree: Tree, compareFn: CompareFn): number[] {
  return recursiveSearch(aTree, 'root', compareFn);
}

function recursiveSearch(
  aTree: Tree,
  nodeName: string,
  compareFn: CompareFn
): number[] {
  const node = aTree[nodeName];
  if (!node) return [];

  const matches = compareFn(node.value);

  if (!node.children.length) {
    return matches ? [node.value] : [];
  }

  const [left, right] = node.children;
  return recursiveSearch(aTree, left, compareFn)
    .concat(matches ? [node.value] : [])
    .concat(recursiveSearch(aTree, right, compareFn));
}
