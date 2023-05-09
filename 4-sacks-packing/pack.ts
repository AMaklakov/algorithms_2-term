import Big from 'big.js'
import * as superb from 'superb'
import { Thing } from './thing'

export class Pack {
  name: string = superb.random()
  size = new Big(1)
  remainingSpace = new Big(1)
  things: Thing[] = []

  addThing(thing: Thing) {
    // if no space => error
    if (this.remainingSpace.lt(thing.weight)) {
      throw new Error(`No space in ${this.name}`)
    }

    this.remainingSpace = this.remainingSpace.minus(thing.weight)
    this.things.push(thing)
  }

  print() {
    console.table(
      this.things.reduce((acc, thing, index) => {
        acc.push({
          name: thing.name,
          weight: thing.weight.toFixed(3),
          total: this.things
            .filter((_, i) => i <= index)
            .reduce((a, thing) => a.plus(thing.weight), new Big(0))
            .toFixed(3),
        })

        return acc
      }, [])
    )

    console.log(`Remaining space: ${this.remainingSpace.toFixed(3)}`)
  }
}
