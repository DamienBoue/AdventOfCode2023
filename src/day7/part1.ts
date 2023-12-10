const fs = require('fs');
const allContents = fs.readFileSync('./src/day7/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    let cardsSets = lines.filter(l => l).map(l => l.split(" "))
        .map(a => new CardsSet(a[0], Number.parseInt(a[1])));

    cardsSets = cardsSets.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type - b.type;
        }

        if (a.cards === b.cards) {
            return 0;
        }

        for (let i = 0; i < 5; i++) {
            if (a.cards[i] === b.cards[i]) {
                continue;
            }

            return convertToNumber(a.cards[i]) - convertToNumber(b.cards[i]);
        }

        return 0;
    });
    for (let i = 0; i < cardsSets.length; i++) {
        result += cardsSets[i].value * (i + 1);
    }

    return result;
};

class CardsSet {
    public type: number;
    constructor(public readonly cards: string, public readonly value: number) {
        this.type = this._type()
    }

    private _type(): number {
        const counts: Map<string, number> = new Map();
        const cardsArray = this.cards.split("");
        cardsArray.forEach((card) => {
            const amount = counts.get(card) || 0;
            counts.set(card, amount + 1);
        });

        switch (counts.size) {
            case 1:
                // five
                return 100;
            case 2:
                //four or full pair
                return this.getHigtherNumberOfCards(counts) === 4 ? 90 : 80;
            case 3:
                //2 pair ou full pair
                return this.getHigtherNumberOfCards(counts) === 3 ? 70 : 60;
            case 4:
                //Pair
                return 50;
            case 5:
                // Haute
                // return Math.max(...[...counts].map(c => convertToNumber(c[0])));
                return 40;
            default:
                return 1;
        }
    }

    private getHigtherNumberOfCards(counts: Map<string, number>) {
        return [...counts.values()].map(number => number).reduce((a, b) => a > b ? a : b);
    }
}

function convertToNumber(card: string) {
    switch (card) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 11;
        case "T":
            return 10;
        default:
            return Number.parseInt(card);
    }

}
