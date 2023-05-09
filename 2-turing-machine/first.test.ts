import { FIRST_STATES as STATES } from './first'
import { startTuringMachine } from './turing-machine'

describe('First task', () => {
  it('should return "" if input was "abc"', () => {
    expect(startTuringMachine(STATES, 'abc', false)).toEqual('')
  })

  it('should return "" if input was "aaa"', () => {
    expect(startTuringMachine(STATES, 'aaa', false)).toEqual('')
  })

  it('should return "" if input was "bbb"', () => {
    expect(startTuringMachine(STATES, 'bbb', false)).toEqual('')
  })

  it('should return "" if input was "ccc"', () => {
    expect(startTuringMachine(STATES, 'ccc', false)).toEqual('')
  })

  it('should return "a" if input was "ab"', () => {
    expect(startTuringMachine(STATES, 'ab', false)).toEqual('a')
  })

  it('should return "a" if input was "ac"', () => {
    expect(startTuringMachine(STATES, 'ac', false)).toEqual('a')
  })

  it('should return "a" if input was "bc"', () => {
    expect(startTuringMachine(STATES, 'bc', false)).toEqual('a')
  })

  it('should return "a" if input was "abac"', () => {
    expect(startTuringMachine(STATES, 'abac', false)).toEqual('a')
  })
})
