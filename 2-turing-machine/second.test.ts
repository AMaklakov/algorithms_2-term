import { SECOND_STATES as STATES } from './second'
import { startTuringMachine } from './turing-machine'

describe('Second task', () => {
  it('should return "aabc" if input was "abc"', () => {
    expect(startTuringMachine(STATES, 'abc').trim()).toEqual('aabc')
  })

  it('should return "aa" if input was "a"', () => {
    expect(startTuringMachine(STATES, 'a').trim()).toEqual('aa')
  })

  it('should return "b" if input was "b"', () => {
    expect(startTuringMachine(STATES, 'b').trim()).toEqual('b')
  })

  it('should return "c" if input was "c"', () => {
    expect(startTuringMachine(STATES, 'c').trim()).toEqual('c')
  })

  it('should return "baa" if input was "ba"', () => {
    expect(startTuringMachine(STATES, 'ba').trim()).toEqual('baa')
  })

  it('should return "=" if input was "="', () => {
    expect(startTuringMachine(STATES, '=').trim()).toEqual('=')
  })
})
