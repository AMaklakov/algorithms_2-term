import {Thing} from './thing';

export function quickSort(things: Thing[]): Thing[] {
    return quickSorting(things, 0, things.length -1)
}

function quickSorting(items: Thing[], left: number, right: number) {
    if (items.length > 1) {
        let index = partition(items, left, right);

        if (left < index - 1) {
            quickSorting(items, left, index - 1);
        }
        if (index < right) {
            quickSorting(items, index, right);
        }
    }

    return items;
}

function partition(items: Thing[], left: number, right: number) {
    let pivot = items[Math.floor((right + left) / 2)].weight,
        i = left,
        j = right;

    while (i <= j) {
        while (items[i].weight.lt(pivot)) {
            i++;
        }

        while (items[j].weight.gt(pivot)) {
            j--;
        }

        if (i <= j) {
            [items[i], items[j]] = [items[j], items[i]];
            i++;
            j--;
        }
    }

    return i;
}
