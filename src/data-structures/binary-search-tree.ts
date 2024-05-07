export class BSTree {
  public root?: BSTNode;
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

  public delete(value: number): void {
    const nodeToDelete = this.find(value);
    if (nodeToDelete) {
      const typeOfNode = nodeToDelete.typeOfNode();
      if (typeOfNode === 'root') {
        if (this.size === 1) {
          return (this.root = undefined);
        }
        let newRootNode: BSTNode;
        if (this.root?.left) {
          newRootNode = this.findMaxFrom(
            this.root?.left ?? this.root
          ) as BSTNode;
        } else {
          newRootNode = this.findMinFrom(
            this.root?.right ?? this.root
          ) as BSTNode;
        }
        this.delete(newRootNode.value);
        this.root?.updateValue(newRootNode.value);
      } else if (typeOfNode === 'left-child') {
        nodeToDelete.parent?.deleteLeftChild();
        this.valuesSet.delete(value);
      } else {
        nodeToDelete.parent?.deleteRightChild();
        this.valuesSet.delete(value);
      }
    }
  }

  private findMaxFrom(subtreeRootNode?: BSTNode): BSTNode | undefined {
    if (!subtreeRootNode) return undefined;

    if (subtreeRootNode.right) return this.findMaxFrom(subtreeRootNode.right);
    return subtreeRootNode;
  }

  private findMinFrom(subtreeRootNode?: BSTNode): BSTNode | undefined {
    if (!subtreeRootNode) return undefined;

    if (subtreeRootNode.left) return this.findMaxFrom(subtreeRootNode.left);
    return subtreeRootNode;
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
    return nodeToCompare.appendChild(newValue);
  }

  public find(value: number): BSTNode | undefined {
    return this.findRecursive(value, this.root);
  }

  private findRecursive(value: number, node?: BSTNode): BSTNode | undefined {
    if (!node) return undefined;
    if (value === node.value) return node;
    if (value < node.value) return this.findRecursive(value, node.left);
    else return this.findRecursive(value, node.right);
  }

  public pathTo(value: number): number[] {
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

  get height(): number {
    if (this.isLeaf()) {
      return 0;
    } else {
      return Math.max(this.left?.height ?? 0, this.right?.height ?? 0) + 1;
    }
  }

  public updateValue(newValue: number) {
    Object.assign(this, {
      value: newValue,
    });
  }

  public isLeaf() {
    return !Boolean(this.left) && !Boolean(this.right);
  }

  public appendChild(value: number): BSTNode {
    if (value > this.value) {
      return this.appendRightChild(value);
    } else {
      return this.appendLeftChild(value);
    }
  }

  private appendRightChild(value: number): BSTNode {
    if (this.hasRightChild()) {
      return this.right.appendChild(value);
    } else {
      this.right = new BSTNode(value, this);
      return this.right;
    }
  }

  private appendLeftChild(value: number): BSTNode {
    if (this.hasLeftChild()) {
      return this.left.appendChild(value);
    } else {
      this.left = new BSTNode(value, this);
      return this.left;
    }
  }

  public hasRightChild(): this is BSTNode & { right: BSTNode } {
    return this.right !== undefined;
  }

  public hasLeftChild(): this is BSTNode & { left: BSTNode } {
    return this.left !== undefined;
  }

  public isGreaterThan(another: BSTNode) {
    return this.value > another.value;
  }

  public isRoot() {
    return !Boolean(this.parent);
  }

  public balanceFactor(): number {
    const leftValue = this.left ? this.left.height + 1 : 0;
    const rightValue = this.right ? this.right.height + 1 : 0;

    return rightValue - leftValue;
  }

  public deleteLeftChild(): void {
    const rightGrandChild = this.left?.right;
    this.left = this.left?.left ?? this.left?.right;
    if (this.left) {
      this.left.right = rightGrandChild;
    }
  }

  public deleteRightChild(): void {
    const rightGrandChild = this.right?.right;
    this.right = this.right?.left ?? this.right?.right;
    if (this.right) {
      this.right.right = rightGrandChild;
    }
  }

  public typeOfNode(): 'root' | 'left-child' | 'right-child' {
    if (this.isRoot()) return 'root';

    const parent = this.parent;
    return this === parent?.left ? 'left-child' : 'right-child';
  }
}
