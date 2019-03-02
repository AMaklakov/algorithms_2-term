import {MoveCarriageEnum, replaceChar} from './util';

export const MCE = MoveCarriageEnum;

export function startTuringMachine(states, str): string {
    if (!states) return;

    let iteration = 1;      // number of current iteration
    let i = 0;              // carriage position
    let Q: number = 0;      // current state
    let S = str[0];         // current symbol

    while (true) {
        if (!states[Q] || !states[Q][S]) {
            throw Error(`No such letter or state of '${S}'`);
        }

        const [char, moving, nextState]: [string, MoveCarriageEnum, number | Function] = states[Q][S];

        // replacement
        str = replaceChar(str, i, char);

        // moving
        i = moving === MCE.TO_RIGHT ? i + 1 : moving === MCE.TO_LEFT ? i - 1 : i;
        S = str[i] || ' ';     // moving carriage (if we want to get 4th symbol of 'abc' string, setting up ' ' char)

        console.log(`${iteration++}: '${char}' - '${moving}' - '${typeof nextState === 'function' ? nextState() : nextState}' ::: '${str}'`);

        // change state
        if (typeof nextState === 'function') {
            console.log(`END: '${nextState()}'`);
            // process.exit(nextState());
            return str.trim();                     // return new string
        } else {
            Q = nextState;
        }
    }
}
