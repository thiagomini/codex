export class AVLTree {
  public root?: AVLNode;

  public addMany(...values: number[]): void {
    values.forEach((v) => this.add(v));
  }

  public add(value: number): AVLNode {
    this.root = this.createNode(value, this.root as AVLNode);
    return this.root;
  }

  public find(value: number): AVLNode | undefined {
    return this.findRecursive(value, this.root);
  }

  public pathTo(value: number): number[] {
    return this.pathToNode(value, this.root as AVLNode);
  }

  private createNode(newValue: number, nodeToCompare?: AVLNode): AVLNode {
    if (!nodeToCompare) return new AVLNode(newValue);

    if (newValue < nodeToCompare.value) {
      nodeToCompare.left = this.createNode(newValue, nodeToCompare.left);
    } else if (newValue > nodeToCompare.value) {
      nodeToCompare.right = this.createNode(newValue, nodeToCompare.right);
    } else {
      return nodeToCompare;
    }

    const balance = nodeToCompare.balanceFactor();

    // Left Left Case
    if (balance < -1 && newValue < (nodeToCompare.left?.value as number)) {
      return this.rotateRight(nodeToCompare);
    }

    // Right Right Case
    if (balance > 1 && newValue > (nodeToCompare.right?.value as number)) {
      return this.rotateLeft(nodeToCompare);
    }

    return nodeToCompare;
  }

  private rotateRight(node: AVLNode): AVLNode {
    const newRoot = node.left as AVLNode;
    const T2 = newRoot?.right;

    newRoot.right = node;
    node.left = T2;

    return newRoot;
  }

  private rotateLeft(node: AVLNode): AVLNode {
    const newRoot = node.right as AVLNode;
    const T2 = newRoot?.left;

    newRoot.left = node;
    node.right = T2;

    return newRoot;
  }

  private findRecursive(value: number, node?: AVLNode): AVLNode | undefined {
    if (!node) return undefined;
    if (value === node.value) return node;
    if (value < node.value) return this.findRecursive(value, node.left);
    else return this.findRecursive(value, node.right);
  }

  private pathToNode(value: number, nodeToCompare?: AVLNode): number[] {
    if (!nodeToCompare) return [];
    if (value === nodeToCompare.value) return [nodeToCompare.value];
    if (value > nodeToCompare.value) {
      if (nodeToCompare.right === undefined) return [];
      return [nodeToCompare.value].concat(
        this.pathToNode(value, nodeToCompare.right as AVLNode)
      );
    } else {
      if (nodeToCompare.left === undefined) return [];
      return [nodeToCompare.value].concat(
        this.pathToNode(value, nodeToCompare.left as AVLNode)
      );
    }
  }
}

export class AVLNode {
  constructor(
    public readonly value: number,
    public left?: AVLNode,
    public right?: AVLNode
  ) {}

  get height(): number {
    if (this.isLeaf()) {
      return 0;
    } else {
      return Math.max(this.left?.height ?? 0, this.right?.height ?? 0) + 1;
    }
  }

  public isLeaf() {
    return this.left === undefined && this.right === undefined;
  }

  public updateValue(newValue: number) {
    Object.assign(this, {
      value: newValue,
    });
  }

  public balanceFactor(): number {
    const leftValue = this.left ? this.left.height + 1 : 0;
    const rightValue = this.right ? this.right.height + 1 : 0;

    return rightValue - leftValue;
  }
}
