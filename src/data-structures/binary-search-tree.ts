export class BSTree {
  private readonly valueToNodeMap = new Map<number, BSTNode>();
  private rootValue?: number;

  public add(value: number): BSTNode {
    if (this.size === 0) {
      const newNode = new BSTNode(value);
      this.valueToNodeMap.set(value, newNode);
      this.rootValue = value;
      return newNode;
    } else {
      return this.createNode(
        value,
        this.valueToNodeMap.get(this.rootValue as number) as BSTNode
      );
    }
  }

  private createNode(newValue: number, nodeToCompare: BSTNode): BSTNode {
    const isGreater = newValue > nodeToCompare.value;

    if (nodeToCompare.isLeaf()) {
      const newNode = new BSTNode(newValue, nodeToCompare.value);
      this.valueToNodeMap.set(
        nodeToCompare.value,
        isGreater
          ? nodeToCompare.withRightChild(newValue)
          : nodeToCompare.withLeftChild(newValue)
      );
      this.valueToNodeMap.set(newValue, newNode);
      return newNode;
    }

    if (isGreater && nodeToCompare.right === undefined) {
      const newNode = new BSTNode(newValue, nodeToCompare.value);
      this.valueToNodeMap.set(
        nodeToCompare.value,
        nodeToCompare.withRightChild(newValue)
      );
      this.valueToNodeMap.set(newValue, newNode);
      return newNode;
    }

    if (!isGreater && nodeToCompare.left === undefined) {
      const newNode = new BSTNode(newValue, nodeToCompare.value);
      this.valueToNodeMap.set(
        nodeToCompare.value,
        nodeToCompare.withLeftChild(newValue)
      );
      this.valueToNodeMap.set(newValue, newNode);
      return newNode;
    }

    throw new Error('Inconsistent state: ' + this.valueToNodeMap);
  }

  public find(value: number) {
    return this.valueToNodeMap.get(value);
  }

  public get size() {
    return this.valueToNodeMap.size;
  }
}

export class BSTNode {
  constructor(
    public readonly value: number,
    public readonly parent?: number,
    public readonly left?: number,
    public readonly right?: number
  ) {}

  public isLeaf() {
    return !Boolean(this.left) && !Boolean(this.right);
  }

  public withRightChild(rightValue: number) {
    return new BSTNode(this.value, this.parent, this.left, rightValue);
  }

  public withLeftChild(leftValue: number) {
    return new BSTNode(this.value, this.parent, leftValue, this.right);
  }
}
