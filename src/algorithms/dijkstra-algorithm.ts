export type Graph = Array<[from: string, to: string, cost: number]>;
export type ShortestPath = {
  cost: number;
  path: string[];
};

export function dijkstra(
  graph: Graph,
  start: string,
  finish: string
): ShortestPath {
  type Node = string;
  type WeightMap = Map<string, number>;
  const graphMap = new Map<Node, WeightMap>();

  graph.forEach(([from, to, cost]) => {
    if (!graphMap.has(from)) graphMap.set(from, new Map());
    graphMap.get(from)?.set(to, cost);
  });
  graphMap.set(finish, new Map());

  const currentCostMap = new Map<string, number>(); // Total cost from start up to node
  for (const [from, to, cost] of graph) {
    if (from === start) {
      currentCostMap.set(to, cost);
    } else {
      currentCostMap.set(to, Infinity);
    }
  }

  const parentsOfNodesMap = new Map<string, string>();
  graph
    .filter(([from]) => from === start)
    .forEach(([from, to]) => parentsOfNodesMap.set(to, from));

  const processedNodes = new Set<string>();

  let lowestCostNode = findLowestCostNode(currentCostMap, processedNodes);

  while (lowestCostNode) {
    const oldCost = currentCostMap.get(lowestCostNode) as number;
    const neighbors = graphMap.get(lowestCostNode) as WeightMap;

    for (const n of neighbors.keys()) {
      const newCost = oldCost + (neighbors.get(n) as number);

      if ((currentCostMap.get(n) as number) > newCost) {
        currentCostMap.set(n, newCost);
        parentsOfNodesMap.set(n, lowestCostNode);
      }
    }
    processedNodes.add(lowestCostNode);
    lowestCostNode = findLowestCostNode(currentCostMap, processedNodes);
  }

  return {
    cost: currentCostMap.get(finish) as number,
    path: pathToFinish(parentsOfNodesMap, finish),
  };
}

function findLowestCostNode(
  costMap: Map<string, number>,
  processedNodes: Set<string>
): string {
  let lowestCost = Infinity;
  let result: string = '';
  for (const [node, cost] of costMap.entries()) {
    if (cost < lowestCost && !processedNodes.has(node)) {
      result = node;
      lowestCost = cost;
    }
  }
  return result;
}

function pathToFinish(parentsOfNodesMap: Map<string, string>, finish: string) {
  let parent = parentsOfNodesMap.get(finish);
  const result = [finish];

  while (parent) {
    result.unshift(parent);
    parent = parentsOfNodesMap.get(parent);
  }

  return result;
}
