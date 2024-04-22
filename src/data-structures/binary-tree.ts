type NodeValue = string | number;

export class BinaryTree {
  private readonly tree: Map<NodeValue, Node> = new Map();

  constructor(rootValue: NodeValue) {
    this.tree.set(rootValue, new Node(rootValue));
  }

  public nodeWithValue(value: NodeValue) {
    return this.tree.get(value);
  }

  public appendRightChildToNode(right: NodeValue, parent: NodeValue) {
    this.tree.set(right, new Node(right, { parent }));

    const parentNode = this.nodeWithValue(parent) as Node;
    this.tree.set(parent, parentNode.withRightChild(right));
  }

  public appendLeftChildToNode(left: NodeValue, parent: NodeValue) {
    this.tree.set(left, new Node(left, { parent }));

    const parentNode = this.nodeWithValue(parent) as Node;
    this.tree.set(parent, parentNode.withLeftChild(left));
  }
}

class Node {
  public readonly left?: NodeValue;
  public readonly right?: NodeValue;
  public readonly parent?: NodeValue;

  constructor(
    public readonly value: NodeValue,
    props?: {
      left?: NodeValue;
      right?: NodeValue;
      parent?: NodeValue;
    }
  ) {
    this.parent = props?.parent;
    this.left = props?.left;
    this.right = props?.right;
  }

  public isRoot() {
    return !Boolean(this.parent);
  }

  public isLeaf() {
    return !Boolean(this.right) && !Boolean(this.left);
  }

  // Fix: it should keep left and parent values
  public withRightChild(value: NodeValue) {
    return new Node(this.value, {
      right: value,
      left: this.left,
      parent: this.parent,
    });
  }

  // Fix: it should keep right and parent values
  public withLeftChild(value: NodeValue) {
    return new Node(this.value, {
      left: value,
      right: this.right,
      parent: this.parent,
    });
  }
} 
