export function crossBreed(generation: number[][]) {
  const generationLength = generation.length
  const crossBreededGeneration = []

  const parents1 = [...generation]
  const parents2 = [...generation.sort(() => Math.random() - 0.5)]

  for (let i = 0; i < generationLength; i++) {
    const parent1 = parents1[i]
    const parent2 = parents2[i]

    const child = []

    for (let variableIndex = 0, length = parent1.length; variableIndex < length; variableIndex++) {
      child.push(Math.random() >= 0.5 ? parent2[variableIndex] : parent1[variableIndex])
    }

    crossBreededGeneration.push(child)
  }

  return crossBreededGeneration
}
