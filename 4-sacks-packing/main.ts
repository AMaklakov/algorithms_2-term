import { quickSort } from './sorting'
import { Packer } from './packer'
import { Thing } from './thing'
import { prompt, Questions } from 'inquirer'

export const THINGS_TOTAL = 5

const QUESTIONS: Questions = [
  {
    type: 'list',
    name: 'answer',
    message: "Let's add a new one?",
    choices: ['Yes', 'No'],
  },
]

const ADD_THING_QUESTIONS: Questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Insert a thing name: ',
  },
  {
    type: 'number',
    name: 'weight',
    message: 'Insert a thing weight: ',
  },
]

function automatic() {
  const packer = new Packer()

  let things: Thing[] = []
  for (let i = 0; i < THINGS_TOTAL; i++) {
    things.push(new Thing(Math.random()))
  }
  things = quickSort(things).reverse() // DESCENDING
  things.forEach((i) => i.print())

  things.forEach((thing) => {
    packer.packThing(thing)
  })

  packer.print()
}

function manual() {
  const packer = new Packer()

  let things: Thing[] = []
  for (let i = 0; i < THINGS_TOTAL; i++) {
    things.push(new Thing(Math.random()))
  }

  things.forEach((thing) => {
    packer.packThing(thing)
  })

  packer.print()
  ;(function addOne() {
    prompt(ADD_THING_QUESTIONS)
      .then(({ name, weight }: { name: string; weight: number }) => {
        const thing = new Thing(weight, name)
        packer.packThing(thing)
        packer.print()
      })
      .then(() =>
        prompt(QUESTIONS).then(({ answer }: { answer: string }) => {
          if (answer === 'Yes') {
            addOne()
          }
        })
      )
  })()
}

/** ! We need to use native terminal instead of emulated in WebStorm one */
prompt([
  {
    type: 'list',
    name: 'answer',
    message: 'Automatic or manual solution?',
    choices: ['Automatic', 'Manual'],
  },
] as Questions).then(({ answer }) => {
  switch (answer) {
    case 'Automatic':
      automatic()
      break
    case 'Manual':
      manual()
      break
  }
})
