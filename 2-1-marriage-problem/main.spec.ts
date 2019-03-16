import 'jasmine';
import {stableMarriage} from './main';

describe('Stable Marriage Problem', () => {
    it('should be ok in 1x1', () => {
        const men = {
            0: [0]
        };

        const women = {
            0: [0]
        };

        expect(stableMarriage(men, women)).toEqual([0]);
    });

    it('should be ok with 2x2', () => {
        const men = {
            0: [1, 0],
            1: [1, 0]
        };

        const women = {
            0: [0, 1],
            1: [1, 0]
        };

        expect(stableMarriage(men, women)).toEqual([0, 1]);
    });

    it('should be ok with 3x3', () => {
        const men = {
            0: [1, 0, 2],
            1: [1, 2, 0],
            2: [2, 0, 1]
        };

        const women = {
            0: [0, 1, 2],
            1: [2, 1, 0],
            2: [0, 1, 2]
        };

        expect(stableMarriage(men, women)).toEqual([0, 1, 2]);
    });

    it('should be ok with 4x4', () => {
        const MEN: { [key: number]: number[] } = {
            0: [0, 1, 2, 3],
            1: [1, 0, 3, 2],
            2: [3, 2, 1, 0],
            3: [0, 2, 3, 1]
        };

        const WOMEN: { [key: number]: number[] } = {
            0: [1, 2, 0, 3],
            1: [3, 2, 1, 0],
            2: [0, 1, 3, 2],
            3: [0, 2, 1, 3]
        };

        expect(stableMarriage(MEN, WOMEN)).toEqual([0, 1, 3, 2]);
    });

    fit('should be ok with 5x5', () => {
        const MEN: { [key: number]: number[] } = {
            0: [3, 1, 2, 0, 4],
            1: [4, 2, 1, 0, 3],
            2: [1, 4, 0, 3, 2],
            3: [4, 1, 3, 2, 0],
            4: [3, 0, 1, 2, 4]
        };

        const WOMEN: { [key: number]: number[] } = {
            0: [3, 1, 4, 2, 0],
            1: [1, 0, 3, 2, 4],
            2: [0, 2, 4, 3, 1],
            3: [3, 0, 2, 1, 4],
            4: [1, 4, 0, 2, 3]
        };

        expect(stableMarriage(MEN, WOMEN)).toEqual([3, 4, 2, 1, 0]);
    });

});
