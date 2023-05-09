import { MoveCarriageEnum } from './util'
import { startTuringMachine } from './turing-machine'
import * as readline from 'readline'

export const MCE = MoveCarriageEnum

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * =================== 1.16 ===================
 * A = {a,b,c} если слово четной длины, то выдать в ответ 'а', иначе пустое слово
 */

// const TRUE = () => 'a';
// const FALSE = () => '';

// export const FIRST_STATES = {
//     0: {
//         'a': ['a', MCE.DO_NOT_MOVE, 1],
//         'b': ['b', MCE.DO_NOT_MOVE, 1],
//         'c': ['c', MCE.DO_NOT_MOVE, 1],
//         ' ': [' ', MCE.TO_RIGHT, 0]
//     },
//     // EVEN
//     1: {
//         'a': ['a', MCE.TO_RIGHT, 2],
//         'b': ['b', MCE.TO_RIGHT, 2],
//         'c': ['c', MCE.TO_RIGHT, 2],
//         ' ': [' ', MCE.DO_NOT_MOVE, TRUE]
//     },
//     // ODD
//     2: {
//         'a': ['a', MCE.TO_RIGHT, 1],
//         'b': ['b', MCE.TO_RIGHT, 1],
//         'c': ['c', MCE.TO_RIGHT, 1],
//         ' ': [' ', MCE.DO_NOT_MOVE, FALSE]
//     }
// };

// rl.question('Input start string ("a", "b", "c"):', (input: string) => {
//     if (input.split('').filter(char => !['a', 'b', 'c'].includes(char)).length) {
//         console.log(`Only 'a' 'b'and 'c'`);
//         process.exit(13);
//     }
//
//     startTuringMachine(FIRST_STATES, input);
//     process.exit(1);
// });

/**
 * =================== 1.24 ===================
 * A = {a,b} Заменить кажое вхождение а на bb
 */

const TRUE = () => 'OK!'
const FALSE = () => 'BAD!'

export const SECOND_STATES = {
  // ENTRANCE
  0: {
    a: ['a', MCE.DO_NOT_MOVE, 1],
    b: ['b', MCE.DO_NOT_MOVE, 1],
    c: ['c', MCE.DO_NOT_MOVE, 1],
    ' ': [' ', MCE.TO_RIGHT, 0],
    '=': ['=', MCE.TO_RIGHT, FALSE],
  },
  // SET '=' symbol to the end of the word
  1: {
    a: ['a', MCE.TO_RIGHT, 1],
    b: ['b', MCE.TO_RIGHT, 1],
    c: ['c', MCE.TO_RIGHT, 1],
    ' ': ['=', MCE.DO_NOT_MOVE, 2],
    '=': ['=', MCE.DO_NOT_MOVE, FALSE],
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
    '=': [' ', MCE.TO_RIGHT, TRUE],
    ' ': [' ', MCE.DO_NOT_MOVE, FALSE],
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
    a: ['a', MCE.DO_NOT_MOVE, FALSE],
    b: ['b', MCE.DO_NOT_MOVE, FALSE],
    c: ['c', MCE.DO_NOT_MOVE, FALSE],
    '=': ['=', MCE.DO_NOT_MOVE, FALSE],
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

// rl.question('Input start string ("a", "b", "c"):', (input: string) => {
//     if (input.split('').filter(char => !['a', 'b', 'c'].includes(char)).length) {
//         console.log(`Only 'a' 'b'and 'c'`);
//         process.exit(13);
//     }
//
//     startTuringMachine(SECOND_STATES, input);
//     process.exit(1);
// });
