import { MCE, replaceChar } from './util'

type Char = [string, MCE, number | (() => string)]
type State = Record<string, Char>
export type States = Record<number, State>

export function startTuringMachine(states: States, str: string, replaceMode = true): string {
  if (!states) {
    throw new Error(`States are required. Got ${states}`)
  }

  let position = 0
  let state: Char[2] = 0
  let symbol = str[0]

  while (true) {
    if (typeof state === 'function') {
      return replaceMode ? str.trim() : state()
    }

    if (!states[state] || !states[state][symbol]) {
      throw Error(`No such letter or state of '${symbol}'`)
    }

    const [char, move, nextState] = states[state][symbol]

    if (replaceMode) {
      str = replaceChar(str, position, char)
    }

    position += getMove(move)
    symbol = str[position] || ' '
    state = nextState
  }
}

const getMove = (move: MCE) => {
  switch (move) {
    case MCE.TO_LEFT:
      return -1
    case MCE.TO_RIGHT:
      return 1
    case MCE.DO_NOT_MOVE:
    default:
      return 0
  }
}
