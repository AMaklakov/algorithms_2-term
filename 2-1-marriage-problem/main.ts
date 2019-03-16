export function stableMarriage(
    MEN: { [key: number]: number[] },
    WOMEN: { [key: number]: number[] }
): Array<boolean | number> {
    const menMarriedArray: Array<boolean | number> = Object.keys(MEN).map(() => false);
    const isWomenVisitedList: boolean[][] = Object.keys(MEN).map(key => MEN[key].map(() => false));

    const womenMarriedArray: Array<boolean | number> = Object.keys(WOMEN).map(() => false);

    let iteration = 1;

    // while we has not married men
    while (menMarriedArray.some(hasWoman => hasWoman === false)) {
        console.log('================= iteration ->', iteration++);
        console.log('MEN:', JSON.stringify(menMarriedArray));
        console.log('WOMEN:', JSON.stringify(womenMarriedArray));

        for (let i = 0; i < menMarriedArray.length; i++) {
            if (menMarriedArray[i] !== false) {
                continue;
            }

            // if 'i' man is not married
            const visited = isWomenVisitedList[i];
            const womanIndex = MEN[i].find(woman => !visited[woman]);

            makeOffer(womanIndex, i);
            visited[womanIndex] = true;
        }

        if (iteration > 100) {
            throw new Error(`May be got stuck????`);
        }
    }

    function makeOffer(womanIndex: number, manIndex: number) {
        if (womenMarriedArray[womanIndex] === false) {
            return acceptOffer(womanIndex, manIndex);
        }

        const woman = WOMEN[womanIndex];
        const newHusbandIndex = woman.indexOf(manIndex);
        const currentHusbandIndex = woman.indexOf(womenMarriedArray[womanIndex] as number);

        if (newHusbandIndex < currentHusbandIndex) {
            return acceptOffer(womanIndex, manIndex);
        }
    }

    function acceptOffer(womanIndex: number, manIndex: number) {
        if (womenMarriedArray[womanIndex] !== false) {
            menMarriedArray[womenMarriedArray[womanIndex] as number] = false;
        }

        womenMarriedArray[womanIndex] = manIndex;
        menMarriedArray[manIndex] = womanIndex;
    }

    return menMarriedArray;
}

// ============ START

// const MEN: { [key: number]: number[] } = {
//     0: [0, 1, 2, 3],
//     1: [1, 0, 3, 2],
//     2: [3, 2, 1, 0],
//     3: [0, 2, 3, 1]
// };
//
// const WOMEN: { [key: number]: number[] } = {
//     0: [1, 2, 0, 3],
//     1: [3, 2, 1, 0],
//     2: [0, 1, 3, 2],
//     3: [0, 2, 1, 3]
// };
//
// stableMarriage(MEN, WOMEN);
