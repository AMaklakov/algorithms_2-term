import * as readline from 'readline'
import { MCE } from './util'
import { States, startTuringMachine } from './turing-machine'

/**
 * =================== 1.16 ===================
 * A = {a,b,c} если слово четной длины, то выдать в ответ 'а', иначе пустое слово
 */

const EXIT = () => 'a'
const ERROR = () => ''

export const FIRST_STATES: States = {
  0: {
    a: ['a', MCE.DO_NOT_MOVE, 1],
    b: ['b', MCE.DO_NOT_MOVE, 1],
    c: ['c', MCE.DO_NOT_MOVE, 1],
    ' ': [' ', MCE.TO_RIGHT, 0],
  },
  // EVEN
  1: {
    a: ['a', MCE.TO_RIGHT, 2],
    b: ['b', MCE.TO_RIGHT, 2],
    c: ['c', MCE.TO_RIGHT, 2],
    ' ': [' ', MCE.DO_NOT_MOVE, EXIT],
  },
  // ODD
  2: {
    a: ['a', MCE.TO_RIGHT, 1],
    b: ['b', MCE.TO_RIGHT, 1],
    c: ['c', MCE.TO_RIGHT, 1],
    ' ': [' ', MCE.DO_NOT_MOVE, ERROR],
  },
}

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })
// rl.question('Input start string ("a", "b", "c"):', (input: string) => {
//   if (input.split('').filter((char) => !['a', 'b', 'c'].includes(char)).length) {
//     console.log(`Only 'a' 'b'and 'c'`)
//     process.exit(13)
//   }
//
//   startTuringMachine(FIRST_STATES, input)
//   process.exit(1)
// })
