enum MoveCarriageEnum {
    TO_LEFT = '<',
    TO_RIGHT = '>',
    DO_NOT_MOVE = '|'
}

const MCE = MoveCarriageEnum;

function replaceChar(str: string, position: number, char: string): string {
    const arr = str.split('');

    arr[position] = char;

    return arr.join('');
}

export function startTuringMachine(states, str): string {
    let iteration = 1;      // number of current iteration
    let i = 0;              // carriage position
    let Q: number = 0;      // current state
    let S = str[0];         // current symbol

    while (true) {
        const [char, moving, nextState]: [string, MoveCarriageEnum, number | Function] = states[Q][S];

        // replacement
        str = replaceChar(str, i, char);

        // moving
        i = moving === MCE.TO_RIGHT ? i + 1 : moving === MCE.TO_LEFT ? i - 1 : i;
        S = str[i] || ' ';     // moving carriage (if we want to get 4th symbol of 'abc' string, setting up ' ' char)

        // console.log(`${iteration++}: '${char}' - '${moving}' - '${typeof nextState === 'function' ? nextState() : nextState}' ::: '${str}'`);

        // change state
        if (typeof nextState === 'function') {
            console.log(`END: '${nextState()}'`);
            // process.exit(nextState());
            return str;                     // return new string
        } else {
            Q = nextState;
        }
    }
}

/**
 * =================== 1.16 ===================
 * A = {a,b,c} если слово четной длины, то выдать в ответ 'а', иначе пустое слово
 */

const TRUE = () => 'a';
const FALSE = () => '';

export const FIRST_STATES = {
    0: {
        'a': ['a', MCE.DO_NOT_MOVE, 1],
        'b': ['b', MCE.DO_NOT_MOVE, 1],
        'c': ['c', MCE.DO_NOT_MOVE, 1],
        ' ': [' ', MCE.TO_RIGHT, 0]
    },
    // EVEN
    1: {
        'a': ['a', MCE.TO_RIGHT, 2],
        'b': ['b', MCE.TO_RIGHT, 2],
        'c': ['c', MCE.TO_RIGHT, 2],
        ' ': [' ', MCE.DO_NOT_MOVE, TRUE]
    },
    // ODD
    2: {
        'a': ['a', MCE.TO_RIGHT, 1],
        'b': ['b', MCE.TO_RIGHT, 1],
        'c': ['c', MCE.TO_RIGHT, 1],
        ' ': [' ', MCE.DO_NOT_MOVE, FALSE]
    }
};

let str = '  abbacacaccab  ';
console.log(`inputed string: '${str}'`);
startTuringMachine(FIRST_STATES, str);

/**
 * =================== 1.24 ===================
 * A = {a,b} Заменить кажое вхождение а на bb
 */

// const TRUE = () => 'OK!';
// const FALSE = () => 'BAD!';
//
export const SECOND_STATES = {
    // ENTRANCE
    0: {
        'a': ['a', MCE.DO_NOT_MOVE, 1],
        'b': ['b', MCE.DO_NOT_MOVE, 1],
        'c': ['c', MCE.DO_NOT_MOVE, 1],
        ' ': [' ', MCE.TO_RIGHT, 0],
        '=': ['=', MCE.TO_RIGHT, FALSE]
    },
    // SET '=' symbol to the end of the word
    1: {
        'a': ['a', MCE.TO_RIGHT, 1],
        'b': ['b', MCE.TO_RIGHT, 1],
        'c': ['c', MCE.TO_RIGHT, 1],
        ' ': ['=', MCE.DO_NOT_MOVE, 2],
        '=': ['=', MCE.DO_NOT_MOVE, FALSE]
    },
    // Go to the very start of the word
    2: {
        'a': ['a', MCE.TO_LEFT, 2],
        'b': ['b', MCE.TO_LEFT, 2],
        'c': ['c', MCE.TO_LEFT, 2],
        '=': ['=', MCE.TO_LEFT, 2],
        ' ': [' ', MCE.TO_RIGHT, 3]
    },
    // What should we do with the symbol?
    3: {
        'a': [' ', MCE.TO_RIGHT, 4],
        'b': [' ', MCE.TO_RIGHT, 6],
        'c': [' ', MCE.TO_RIGHT, 7],
        '=': [' ', MCE.TO_RIGHT, TRUE],
        ' ': [' ', MCE.DO_NOT_MOVE, FALSE]
    },
    // If found 'a' symbol
    4: {
        'a': ['a', MCE.TO_RIGHT, 4],
        'b': ['b', MCE.TO_RIGHT, 4],
        'c': ['c', MCE.TO_RIGHT, 4],
        '=': ['=', MCE.TO_RIGHT, 4],
        ' ': ['a', MCE.TO_RIGHT, 5]
    },
    // second 'a'
    5: {
        'a': ['a', MCE.DO_NOT_MOVE, FALSE],
        'b': ['b', MCE.DO_NOT_MOVE, FALSE],
        'c': ['c', MCE.DO_NOT_MOVE, FALSE],
        '=': ['=', MCE.DO_NOT_MOVE, FALSE],
        ' ': ['a', MCE.DO_NOT_MOVE, 2]          // go to very start
    },
    // found 'b'
    6: {
        'a': ['a', MCE.TO_RIGHT, 6],
        'b': ['b', MCE.TO_RIGHT, 6],
        'c': ['c', MCE.TO_RIGHT, 6],
        '=': ['=', MCE.TO_RIGHT, 6],
        ' ': ['b', MCE.DO_NOT_MOVE, 2]          // go to the very start
    },
    // found 'c'
    7: {
        'a': ['a', MCE.TO_RIGHT, 7],
        'b': ['b', MCE.TO_RIGHT, 7],
        'c': ['c', MCE.TO_RIGHT, 7],
        '=': ['=', MCE.TO_RIGHT, 7],
        ' ': ['c', MCE.DO_NOT_MOVE, 2]
    }
};

// let str = '  abbacacaccab  ';   // expected to equal 'aabbaacaacaaccaab'
// let str = '  abc  ';
// console.log(`inputed string: '${str}'`);
// startTuringMachine(SECOND_STATES, str);
