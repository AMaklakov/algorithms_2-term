import 'jasmine';
import {SECOND_STATES, startTuringMachine} from './main';

describe('Turing machine', () => {
    // describe('First task', () => {
    //     const STATES = FIRST_STATES;
    //
    //     it('should return "" if input was "abc"', () => {
    //         expect(startTuringMachine(STATES, 'abc').trim()).toEqual('');
    //     });
    //
    //     it('should return "" if input was "aaa"', () => {
    //         expect(startTuringMachine(STATES, 'aaa').trim()).toEqual('');
    //     });
    //
    //     it('should return "" if input was "bbb"', () => {
    //         expect(startTuringMachine(STATES, 'bbb').trim()).toEqual('');
    //     });
    //
    //     it('should return "" if input was "ccc"', () => {
    //         expect(startTuringMachine(STATES, 'ccc').trim()).toEqual('');
    //     });
    //
    //     it('should return "a" if input was "ab"', () => {
    //         expect(startTuringMachine(STATES, 'ab').trim()).toEqual('a');
    //     });
    //
    //     it('should return "a" if input was "ac"', () => {
    //         expect(startTuringMachine(STATES, 'ac').trim()).toEqual('');
    //     });
    //
    //     it('should return "a" if input was "bc"', () => {
    //         expect(startTuringMachine(STATES, 'bc').trim()).toEqual('');
    //     });
    //
    //     it('should return "a" if input was "abac"', () => {
    //         expect(startTuringMachine(STATES, 'abac').trim()).toEqual('');
    //     });
    //
    // });

    describe('Second task', () => {
        const STATES = SECOND_STATES;

        it('should return "aabc" if input was "abc"', () => {
            expect(startTuringMachine(STATES, 'abc').trim()).toEqual('aabc');
        });

        it('should return "aa" if input was "a"', () => {
            expect(startTuringMachine(STATES, 'a').trim()).toEqual('aa');
        });

        it('should return "b" if input was "b"', () => {
            expect(startTuringMachine(STATES, 'b').trim()).toEqual('b');
        });

        it('should return "c" if input was "c"', () => {
            expect(startTuringMachine(STATES, 'c').trim()).toEqual('c');
        });

        it('should return "baa" if input was "ba"', () => {
            expect(startTuringMachine(STATES, 'ba').trim()).toEqual('baa');
        });

        it('should return "=" if input was "="', () => {
            expect(startTuringMachine(STATES, '=').trim()).toEqual('=');
        });
    });
});
