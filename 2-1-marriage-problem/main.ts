export function stableMarriage(
  MEN: { [key: number]: number[] },
  WOMEN: { [key: number]: number[] }
): Array<boolean | number> {
  const men: Array<boolean | number> = Object.keys(MEN).map(() => false)
  const women: Array<boolean | number> = Object.keys(WOMEN).map(() => false)
  const womanVisitedList: boolean[][] = Object.keys(MEN).map((key) => MEN[key].map(() => false))

  let iteration = 1

  // while we have not married men
  while (men.some((hasWoman) => hasWoman === false)) {
    // console.log('================= iteration ->', iteration++)
    // console.log('MEN:', JSON.stringify(men))
    // console.log('WOMEN:', JSON.stringify(women))

    for (let i = 0; i < men.length; i++) {
      if (men[i] !== false) {
        continue
      }

      // if 'i' man is not married
      const visited = womanVisitedList[i]
      const womanIndex = MEN[i].find((woman) => !visited[woman])

      makeOffer(womanIndex, i)
      visited[womanIndex] = true
    }

    if (iteration > 100) {
      throw new Error(`May be got stuck????`)
    }
  }

  function makeOffer(wIndex: number, mIndex: number) {
    if (women[wIndex] === false) {
      return acceptOffer(wIndex, mIndex)
    }

    const woman = WOMEN[wIndex]
    const newHusbandIndex = woman.indexOf(mIndex)
    const currentHusbandIndex = woman.indexOf(women[wIndex] as number)

    if (newHusbandIndex < currentHusbandIndex) {
      return acceptOffer(wIndex, mIndex)
    }
  }

  function acceptOffer(womanIndex: number, manIndex: number) {
    if (women[womanIndex] !== false) {
      men[women[womanIndex] as number] = false
    }

    women[womanIndex] = manIndex
    men[manIndex] = womanIndex
  }

  return men
}

// ============ START

// const MEN: { [key: number]: number[] } = {
//   0: [0, 1, 2, 3],
//   1: [1, 0, 3, 2],
//   2: [3, 2, 1, 0],
//   3: [0, 2, 3, 1],
// }
//
// const WOMEN: { [key: number]: number[] } = {
//   0: [1, 2, 0, 3],
//   1: [3, 2, 1, 0],
//   2: [0, 1, 3, 2],
//   3: [0, 2, 1, 3],
// }
//
// stableMarriage(MEN, WOMEN)
