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

const FIVE_OF_A_KING = 100;
const FOUR_OF_A_KING = 90;
const FULL_HOUSE = 80;
const THREE_OF_A_KING = 70;
const TWO_PAIR = 60;
const PAIR = 50;
const HIGH = 40;


class CardsSet {
    public type: number;
    constructor(public readonly cards: string, public readonly value: number) {
        this.type = this._type()
    }

    private _type(): number {
        let differentCards: Map<string, number> = new Map();
        const cardsArray = this.cards.split("");
        cardsArray.forEach((card) => {
            const amount = differentCards.get(card) || 0;
            differentCards.set(card, amount + 1);
        });

        if (differentCards.has("J")) {
            const amountOfJokers = differentCards.get("J")!;

            if(amountOfJokers === 5) {
                return FIVE_OF_A_KING;
            }
            differentCards = new Map([...differentCards.entries()].filter(e => e[0] !== "J"));

            const higtherNumberOfCards = this.getHigtherNumberOfCards(differentCards);
            differentCards.set(higtherNumberOfCards[0], higtherNumberOfCards[1] + amountOfJokers);
        }

        switch (differentCards.size) {
            case 1:
                return FIVE_OF_A_KING;
            case 2:
                return this.getHigtherNumberOfCards(differentCards)[1] === 4 ? FOUR_OF_A_KING : FULL_HOUSE;
            case 3:
                return this.getHigtherNumberOfCards(differentCards)[1] === 3 ? THREE_OF_A_KING : TWO_PAIR;
            case 4:
                return PAIR;
            case 5:
                return HIGH;
            default:
                return 1;
        }
    }

    private getHigtherNumberOfCards(counts: Map<string, number>) {
        return [...counts.entries()].map(number => number).reduce((a, b) => a[1] > b[1] ? a : b);
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
            return 1;
        case "T":
            return 10;
        default:
            return Number.parseInt(card);
    }

}
