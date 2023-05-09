import { Thing } from './thing'
import { Pack } from './pack'
import { Big } from 'big.js'

export class Packer {
  packs: Pack[] = [new Pack()]
  thingCounter: number = 1

  packThing(thing: Thing) {
    const suitablePack = this.packs.find((pack) => pack.remainingSpace.gte(thing.weight))

    if (!suitablePack) {
      const newPack = new Pack()
      newPack.addThing(thing)
      this.packs.push(newPack)

      console.log(`Thing number ${this.thingCounter++}: ${thing.getInfo()} goes to a new pack`)

      return
    }

    console.log(`Thing number ${this.thingCounter++}: ${thing.getInfo()} goes to existing pack`)
    suitablePack.addThing(thing)
  }

  print() {
    this.packs.forEach((pack, index) => {
      console.log(`Pack number ${index + 1}`)
      pack.print()
    })

    console.log(
      `TOTAL: ${this.packs.length} packs with ${this.packs.reduce(
        (b, p) => b.plus(p.remainingSpace),
        new Big(0)
      )} remaining space`
    )
  }
}
