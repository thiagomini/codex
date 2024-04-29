import { Queue } from './queue';

export class BSTree {
  private root?: BSTNode;
  private valuesSet: Set<number> = new Set();

  public add(value: number): BSTNode {
    if (this.size === 0) {
      const newNode = new BSTNode(value);
      this.valuesSet.add(value);
      this.root = newNode;
      return newNode;
    } else {
      this.valuesSet.add(value);
      return this.createNode(value, this.root as BSTNode);
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
          this.preOrderQueue(node.left as BSTNode).concat(
            this.preOrderQueue(node.right as BSTNode)
          )
        );
      if (node.left !== undefined) {
        return [node].concat(this.preOrderQueue(node.left as BSTNode));
      }
      if (node.right !== undefined) {
        return [node].concat(this.preOrderQueue(node.right as BSTNode));
      }
      throw new Error('Inconsistent state for node' + node.value);
    }
  }

  public addMany(...values: number[]): void {
    values.forEach((v) => this.add(v));
  }

  private createNode(newValue: number, nodeToCompare: BSTNode): BSTNode {
    if (newValue === nodeToCompare.value) return nodeToCompare;
    const isGreater = newValue > nodeToCompare.value;

    if (nodeToCompare.isLeaf()) {
      const newNode = new BSTNode(newValue, nodeToCompare);
      if (isGreater) {
        nodeToCompare.right = newNode;
      } else {
        nodeToCompare.left = newNode;
      }

      return newNode;
    }

    if (isGreater) {
      if (nodeToCompare.right === undefined) {
        const newNode = new BSTNode(newValue, nodeToCompare);
        nodeToCompare.right = newNode;
        return newNode;
      } else {
        return this.createNode(newValue, nodeToCompare.right as BSTNode);
      }
    }

    if (nodeToCompare.left === undefined) {
      const newNode = new BSTNode(newValue, nodeToCompare);
      nodeToCompare.left = newNode;
      return newNode;
    } else {
      return this.createNode(newValue, nodeToCompare.left as BSTNode);
    }
  }

  public find(value: number) {
    return this.findRecursive(value, this.root);
  }

  private findRecursive(value: number, node?: BSTNode): BSTNode | undefined {
    if (!node) return undefined;
    if (value === node.value) return node;
    if (value < node.value) return this.findRecursive(value, node.left);
    else return this.findRecursive(value, node.right);
  }

  public pathTo(value: number) {
    return this.pathToNode(value, this.root as BSTNode);
  }

  private pathToNode(value: number, nodeToCompare?: BSTNode): number[] {
    if (!nodeToCompare) return [];
    if (value === nodeToCompare.value) return [nodeToCompare.value];
    if (value > nodeToCompare.value) {
      if (nodeToCompare.right === undefined) return [];
      return [nodeToCompare.value].concat(
        this.pathToNode(value, nodeToCompare.right as BSTNode)
      );
    } else {
      if (nodeToCompare.left === undefined) return [];
      return [nodeToCompare.value].concat(
        this.pathToNode(value, nodeToCompare.left as BSTNode)
      );
    }
  }

  public get size() {
    return this.valuesSet.size;
  }
}

export class BSTNode {
  constructor(
    public readonly value: number,
    public readonly parent?: BSTNode,
    public left?: BSTNode,
    public right?: BSTNode
  ) {}

  public isLeaf() {
    return !Boolean(this.left) && !Boolean(this.right);
  }

  public isGreaterThan(another: BSTNode) {
    return this.value > another.value;
  }
}
