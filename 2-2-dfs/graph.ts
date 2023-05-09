export class Graph {
  private readonly verticesTotal: number

  constructor(public adjacencyMatrix: number[][]) {
    if (!adjacencyMatrix || !adjacencyMatrix.length) {
      throw new Error(`adjacencyMatrix: ${adjacencyMatrix} is not valid!`)
    }

    this.verticesTotal = adjacencyMatrix.length
  }

  getVisitedVerticesArray(): boolean[] {
    return this.adjacencyMatrix.map(() => false)
  }

  dfs(startPosition: number = 0): number[] {
    if (startPosition >= this.getVisitedVerticesArray().length || startPosition < 0) {
      throw new Error(`Invalid start position: ${startPosition}`)
    }

    return this.performDFS(startPosition)
  }

  performDFS(startPosition: number): number[] {
    const connectedComponent = [startPosition]

    const visited = this.getVisitedVerticesArray()
    visited[startPosition] = true

    const stack = [startPosition]

    while (stack.length > 0) {
      const currentVertex = stack.pop()
      const currentAdjacencyList = this.adjacencyMatrix[currentVertex]

      for (let i = 0; i < this.verticesTotal; i++) {
        if (currentAdjacencyList[i] && !visited[i]) {
          visited[i] = true
          stack.push(i)

          connectedComponent.push(i)
        }
      }
    }

    return connectedComponent.sort((a, b) => a - b)
  }
}
