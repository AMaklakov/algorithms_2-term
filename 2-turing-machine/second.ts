import * as readline from 'readline'
import { MCE } from './util'
import { States, startTuringMachine } from './turing-machine'

/**
 * =================== 1.24 ===================
 * A = {a,b} Заменить кажое вхождение а на bb
 */

const EXIT = () => 'OK!'
const ERROR = () => 'BAD!'

export const SECOND_STATES: States = {
  // ENTRANCE
  0: {
    a: ['a', MCE.DO_NOT_MOVE, 1],
    b: ['b', MCE.DO_NOT_MOVE, 1],
    c: ['c', MCE.DO_NOT_MOVE, 1],
    ' ': [' ', MCE.TO_RIGHT, 0],
    '=': ['=', MCE.TO_RIGHT, ERROR],
  },
  // SET '=' symbol to the end of the word
  1: {
    a: ['a', MCE.TO_RIGHT, 1],
    b: ['b', MCE.TO_RIGHT, 1],
    c: ['c', MCE.TO_RIGHT, 1],
    ' ': ['=', MCE.DO_NOT_MOVE, 2],
    '=': ['=', MCE.DO_NOT_MOVE, ERROR],
  },
  // Go to the very start of the word
  2: {
    a: ['a', MCE.TO_LEFT, 2],
    b: ['b', MCE.TO_LEFT, 2],
    c: ['c', MCE.TO_LEFT, 2],
    '=': ['=', MCE.TO_LEFT, 2],
    ' ': [' ', MCE.TO_RIGHT, 3],
  },
  // What should we do with the symbol?
  3: {
    a: [' ', MCE.TO_RIGHT, 4],
    b: [' ', MCE.TO_RIGHT, 6],
    c: [' ', MCE.TO_RIGHT, 7],
    '=': [' ', MCE.TO_RIGHT, EXIT],
    ' ': [' ', MCE.DO_NOT_MOVE, ERROR],
  },
  // If found 'a' symbol
  4: {
    a: ['a', MCE.TO_RIGHT, 4],
    b: ['b', MCE.TO_RIGHT, 4],
    c: ['c', MCE.TO_RIGHT, 4],
    '=': ['=', MCE.TO_RIGHT, 4],
    ' ': ['a', MCE.TO_RIGHT, 5],
  },
  // second 'a'
  5: {
    a: ['a', MCE.DO_NOT_MOVE, ERROR],
    b: ['b', MCE.DO_NOT_MOVE, ERROR],
    c: ['c', MCE.DO_NOT_MOVE, ERROR],
    '=': ['=', MCE.DO_NOT_MOVE, ERROR],
    ' ': ['a', MCE.DO_NOT_MOVE, 2], // go to very start
  },
  // found 'b'
  6: {
    a: ['a', MCE.TO_RIGHT, 6],
    b: ['b', MCE.TO_RIGHT, 6],
    c: ['c', MCE.TO_RIGHT, 6],
    '=': ['=', MCE.TO_RIGHT, 6],
    ' ': ['b', MCE.DO_NOT_MOVE, 2], // go to the very start
  },
  // found 'c'
  7: {
    a: ['a', MCE.TO_RIGHT, 7],
    b: ['b', MCE.TO_RIGHT, 7],
    c: ['c', MCE.TO_RIGHT, 7],
    '=': ['=', MCE.TO_RIGHT, 7],
    ' ': ['c', MCE.DO_NOT_MOVE, 2],
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
//   startTuringMachine(SECOND_STATES, input)
//   process.exit(1)
// })
