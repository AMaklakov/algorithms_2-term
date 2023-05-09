import { Graph } from './graph'

describe('DFS', () => {
  it('should be ok with 1', () => {
    const graph = new Graph([[0]])
    expect(graph.dfs(0)).toEqual([0])
  })

  it('should be ok with 2 - connected', () => {
    const graph = new Graph([
      [0, 1],
      [1, 0],
    ])
    expect(graph.dfs(1)).toEqual([0, 1])
  })

  it('should be ok with 2 - disconnected', () => {
    const graph = new Graph([
      [0, 0],
      [0, 0],
    ])
    expect(graph.dfs(0)).toEqual([0])
    expect(graph.dfs(1)).toEqual([1])
  })

  it('should be ok with 3 - connected', () => {
    const graph = new Graph([
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ])
    expect(graph.dfs(1)).toEqual([0, 1, 2])
  })

  it('should be ok with 4', () => {
    const graph = new Graph([
      [0, 1, 1, 0],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ])
    expect(graph.dfs(2)).toEqual([0, 1, 2])
  })

  it('should be ok 5', () => {
    const graph = new Graph([
      [0, 1, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
    ])
    expect(graph.dfs(0)).toEqual([0, 1, 2])
    expect(graph.dfs(3)).toEqual([3, 4])
  })

  it('should be ok 11', () => {
    const graph = new Graph([
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 0 - 1, 9
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], // 1 - 0, 2, 6
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], // 2 - 1, 3
      [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0], // 3 - 2, 4
      [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0], // 4 - 3, 5, 6
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], // 5 - 4, 6
      [0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0], // 6 - 2, 4, 5, 8, 9, 7
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0], // 7 - 6, 9
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // 8 - 6
      [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], // 9 - 0, 6, 7, 10
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // 10 - 9
    ])
    expect(graph.dfs(0)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})
