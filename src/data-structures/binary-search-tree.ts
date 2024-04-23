import { Queue } from './queue';

export class BSTree {
  private readonly valueToNodeMap = new Map<number, BSTNode>();
  private rootValue?: number;

  public get root() {
    return this.valueToNodeMap.get(this.rootValue as number);
  }

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

  *[Symbol.iterator]() {
    if (this.root === undefined) return;

    const queue = this.preOrderQueue(this.root);

    while (queue.length > 0) {
      yield queue.shift();
    }
  }

  private preOrderQueue(node: BSTNode): BSTNode[] {
    if (node.left === undefined && node.right === undefined) {
      return [node];
    } else {
      if (node.left && node.right)
        return [node].concat(
          this.preOrderQueue(
            this.valueToNodeMap.get(node.left) as BSTNode
          ).concat(
            this.preOrderQueue(this.valueToNodeMap.get(node.right) as BSTNode)
          )
        );
      if (node.left !== undefined) {
        return [node].concat(
          this.preOrderQueue(this.valueToNodeMap.get(node.left) as BSTNode)
        );
      }
      if (node.right !== undefined) {
        return [node].concat(
          this.preOrderQueue(this.valueToNodeMap.get(node.right) as BSTNode)
        );
      }
      throw new Error('Inconsistent state for node' + node.value);
    }
  }

  public addMany(...values: number[]): void {
    values.forEach((v) => this.add(v));
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

    if (isGreater) {
      if (nodeToCompare.right === undefined) {
        const newNode = new BSTNode(newValue, nodeToCompare.value);
        this.valueToNodeMap.set(
          nodeToCompare.value,
          nodeToCompare.withRightChild(newValue)
        );
        this.valueToNodeMap.set(newValue, newNode);
        return newNode;
      } else {
        return this.createNode(
          newValue,
          this.find(nodeToCompare.right) as BSTNode
        );
      }
    }

    if (nodeToCompare.left === undefined) {
      const newNode = new BSTNode(newValue, nodeToCompare.value);
      this.valueToNodeMap.set(
        nodeToCompare.value,
        nodeToCompare.withLeftChild(newValue)
      );
      this.valueToNodeMap.set(newValue, newNode);
      return newNode;
    } else {
      return this.createNode(
        newValue,
        this.find(nodeToCompare.left) as BSTNode
      );
    }
  }

  public find(value: number) {
    return this.valueToNodeMap.get(value);
  }

  public pathTo(value: number) {
    return this.pathToNode(
      value,
      this.find(this.rootValue as number) as BSTNode
    );
  }

  private pathToNode(value: number, nodeToCompare: BSTNode): number[] {
    if (value === nodeToCompare.value) return [nodeToCompare.value];
    if (value > nodeToCompare.value) {
      if (nodeToCompare.right === undefined) return [];
      return [nodeToCompare.value].concat(
        this.pathToNode(value, this.find(nodeToCompare.right) as BSTNode)
      );
    } else {
      if (nodeToCompare.left === undefined) return [];
      return [nodeToCompare.value].concat(
        this.pathToNode(value, this.find(nodeToCompare.left) as BSTNode)
      );
    }
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
