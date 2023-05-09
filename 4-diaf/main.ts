import { crossBreed } from './cross-breeding'
import { mutation } from './mutation'
import { selection } from './selection'
import { replace } from './replacement'

export const POPULATION_TOTAL = 5
const MUTATION_TOTAL = Math.floor(POPULATION_TOTAL / 2)
export const MUTATION_PROBABILITY = 0.18
export const REPLACE_TOTAL = Math.floor(POPULATION_TOTAL / 3)

export const RANGE = 200

const powU = 1
const powW = 1
const powX = 2
const powY = 2
const powZ = 0

const powU1 = 0
const powW1 = 0
const powX1 = 1
const powY1 = 0
const powZ1 = 0

const powU2 = 2
const powW2 = 2
const powX2 = 0
const powY2 = 2
const powZ2 = 1

const powU3 = 2
const powW3 = 1
const powX3 = 0
const powY3 = 1
const powZ3 = 2

const powU4 = 2
const powW4 = 1
const powX4 = 0
const powY4 = 0
const powZ4 = 1

const Result = 40

export function solveEquation([u, w, x, y, z]: number[], needShow?: boolean) {
  if (needShow) {
    console.log(
      `${u} ^ ${powU} * ${w} ^ ${powW} * ${x} ^ ${powX} * ${y} ^ ${powY} * ${z} ^ ${powZ} \n` +
        `+ ${u} ^ ${powU1} * ${w} ^ ${powW1} * ${x} ^ ${powX1} * ${y} ^ ${powY1} * ${z} ^ ${powZ1}\n` +
        `+ ${u} ^ ${powU2} * ${w} ^ ${powW2} * ${x} ^ ${powX2} * ${y} ^ ${powY2} * ${z} ^ ${powZ2}\n` +
        `+ ${u} ^ ${powU3} * ${w} ^ ${powW3} * ${x} ^ ${powX3} * ${y} ^ ${powY3} * ${z} ^ ${powZ3}\n` +
        `+ ${u} ^ ${powU4} * ${w} ^ ${powW4} * ${x} ^ ${powX4} * ${y} ^ ${powY4} * ${z} ^ ${powZ4} = ${Result}`
    )
  }

  const equation =
    u ** powU * w ** powW * x ** powX * y ** powY * z ** powZ +
    u ** powU1 * w ** powW1 * x ** powX1 * y ** powY1 * z ** powZ1 +
    u ** powU2 * w ** powW2 * x ** powX2 * y ** powY2 * z ** powZ2 +
    u ** powU3 * w ** powW3 * x ** powX3 * y ** powY3 * z ** powZ3 +
    u ** powU4 * w ** powW4 * x ** powX4 * y ** powY4 * z ** powZ4

  if (needShow) {
    console.log(`Current result = ${equation}, expected:`, Result)
  }

  return Math.abs(equation - Result)
}

/**
 * 2
 *
 * Начальная популяция
 * Случайная в (-200,200)
 *
 * Селекция
 * Пропорциональная
 *
 * Cкрещивание
 * Однородное вероятностное
 *
 * Мутация
 * Каждый бит некоторых наименее пригодных потомков мутирует с некоторой вероятностью p
 *
 * Замещение
 * Наименее пригодных особей старой популяции заменить на наиболее пригодных особей из потомков
 */

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

function makeStaringPopulation(): number[][] {
  const generation: number[][] = []

  for (let i = 0; i < POPULATION_TOTAL; i++) {
    const chromosome = [
      getRandomInt(-RANGE, RANGE),
      getRandomInt(-RANGE, RANGE),
      getRandomInt(-RANGE, RANGE),
      getRandomInt(-RANGE, RANGE),
      getRandomInt(-RANGE, RANGE),
    ]

    generation.push(chromosome)
  }

  return generation
}

export function sortPopulation(population: number[][]) {
  return population.sort((a, b) => solveEquation(a) - solveEquation(b))
}

let closest = 1
let generationNumber = 1
let previousGeneration: number[][] = []

while (closest) {
  console.log('=================================================== ' + generationNumber)

  const generation = sortPopulation(generationNumber++ === 1 ? makeStaringPopulation() : previousGeneration)

  closest = solveEquation(generation[0])
  console.log(`CLOSEST = ${closest}, [${generation[0]}]`)

  if (closest === 0) {
    continue
  }
  // console.log('GENERATION');
  // console.table(generation);

  const selectedGeneration = sortPopulation(selection(generation))
  // console.log('SELECTED');
  // console.table(selectedGeneration);

  const crossBreededGeneration = sortPopulation(crossBreed(selectedGeneration))
  // console.log('Cross-breeded');
  // console.table(crossBreededGeneration);

  const mutatedGeneration = sortPopulation(mutation(crossBreededGeneration, MUTATION_TOTAL))
  // console.log('Mutated');
  // console.table(mutatedGeneration);

  previousGeneration = replace(generation, mutatedGeneration)
  // console.log('REPLACED');
  // console.table(previousGeneration);

  // if (generationNumber === 2) {
  //     break;
  // }

  if (generationNumber === 100000) {
    throw new Error('May be something is wrong?')
  }
}

console.log(`END! The solution is [${previousGeneration[0]}]`) // END! The solution is [184,0,40,-196,95]
solveEquation(previousGeneration[0], true)
