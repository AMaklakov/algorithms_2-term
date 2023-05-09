import { solveEquation } from './main'

/**
 * Высчитываем для каждого вероятность
 */
function proportionalSelection(fitnessList: number[]) {
  const chromosomesLength = fitnessList.length
  const averageFitness = fitnessList.reduce((buff, item) => buff + item, 0) / chromosomesLength
  const probabilities = fitnessList.map((item) => item / (averageFitness * chromosomesLength))

  // console.log('selection');
  // console.table(probabilities);

  return probabilities
}

function getSelectedChromosome(randomNumber: number, ranges: number[][], generation: number[][]) {
  /**
   * Берем индекс: фильтруем массив так, чтобы там находились только значения,
   * в диапазоне min и max которых находится наш randomNumber
   * Берем [0][2]
   * [0] - Потому что в итоге в массиве будет 1 элемент
   * [2] - Потому что элемент выглядит как [min, max, index]
   *
   * Нам нужно получить index элемента
   */
  const index = ranges.filter((item) => randomNumber >= item[0] && randomNumber < item[1])[0][2]

  return generation[index]
}

function getRanges(selectionProbabilities: number[]) {
  return selectionProbabilities.map((probability, index, arr) => {
    const min = arr
      .filter((_, smallerIndex) => smallerIndex < index)
      .reduce((buff, smallerProbability) => buff + smallerProbability, 0)

    const max = min + probability

    return [min, max, index]
  })
}

export function selection(generation: number[][]): number[][] {
  const GENERATION_LENGTH = generation.length

  // Считаем подходящесть для каждой хромосомы
  const fitness = generation.map((chromosome) => 1 / solveEquation(chromosome))

  // Получаем вероятности для взятия каждой хромосомы
  const selectionProbabilities = proportionalSelection(fitness)

  // Строим допустимые диапоазоны для каждой хромосомы
  const ranges = getRanges(selectionProbabilities)
  // console.table(ranges);

  const selectedGeneration = []

  for (let i = 0; i < GENERATION_LENGTH; i++) {
    const selectedChromosome = getSelectedChromosome(Math.random(), ranges, generation)

    // Копируем массив (чтобы избавиться от ссылок на один и тот же элемент)
    selectedGeneration.push([...selectedChromosome])
  }

  return selectedGeneration
}
