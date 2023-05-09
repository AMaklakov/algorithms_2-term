import { POPULATION_TOTAL, REPLACE_TOTAL, sortPopulation } from './main'

export function replace(oldGeneration: number[][], newGeneration: number[][]) {
  const strongestFromNew = newGeneration.filter((_, index) => index < REPLACE_TOTAL)

  let replaced = oldGeneration.concat(strongestFromNew)
  replaced = sortPopulation(replaced)

  return replaced.filter((_, index) => index < POPULATION_TOTAL)
}
