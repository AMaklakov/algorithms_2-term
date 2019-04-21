import {Big} from 'big.js';
// @ts-ignore
import * as superb from 'superb';

export class Thing {
    name: string = superb.random();
    weight: Big = new Big(1);

    constructor(weight: number, name?: string) {
        this.weight = new Big(weight.toFixed(3));

        if (name) {
            this.name = name;
        }
    }

    print() {
        console.log(`Thing: ${this.name} - ${this.weight.toFixed(3)}`);
    }

    getInfo() {
        return `${this.name} - ${this.weight.toFixed(3)}`;
    }
}
