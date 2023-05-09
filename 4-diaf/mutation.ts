import { getRandomInt, MUTATION_PROBABILITY, RANGE } from './main'

export function mutation(generation: number[][], mutateTotal: number) {
  let mutatedGeneration = generation.map((item) => [...item]).reverse() // copy array

  for (let i = 0; i < mutateTotal; i++) {
    mutatedGeneration[i] = mutatedGeneration[i].map((bit) =>
      // С вероятностью MUTATION_PROBABILITY заменяем число на новое число
      Math.random() <= MUTATION_PROBABILITY ? getRandomInt(-RANGE, RANGE) : bit
    )
  }

  return mutatedGeneration
}
