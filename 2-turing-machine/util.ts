// MoveCarriageEnum
export enum MCE {
  TO_LEFT = '<',
  TO_RIGHT = '>',
  DO_NOT_MOVE = '|',
}

export function replaceChar(str: string, position: number, char: string) {
  const arr = str.split('')

  arr[position] = char

  return arr.join('')
}
