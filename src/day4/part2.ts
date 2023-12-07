const fs = require('fs');
const allContents = fs.readFileSync('./src/day4/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;
    const cards = lines.filter(l => l)
        .map(l => new Card(l));
    const scratchCards = new ScratchCards()

    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        const card = cards[cardIndex];

        const matchingNumbers = card.matchingNumbers();

        scratchCards.add([card], 1);
        if (matchingNumbers.length > 0) {
            const scratchedCards = getScratchedCards(cards, cardIndex, matchingNumbers.length);

            scratchCards.add(scratchedCards, scratchCards.get(card)!);
        }
    }

    scratchCards.forEach((amount) => {
        result += amount;
    });

    return result;
};

function getScratchedCards(cards: Card[], cardIndex: number, scratchToGet: number) {
    let scratchIndex = 0;
    const scratchedCards: Card[] = []
    for (let j = 0; j < scratchToGet; j++) {
        const scratchIndexToGet = j + cardIndex + 1;
        if (scratchIndex in cards) {
            const card = cards[scratchIndexToGet];
            scratchedCards.push(card);
        }
    }

    return scratchedCards;
}

class Card {
    constructor(line: string) {
        const gameAndCards = line.split(":");
        this.card = gameAndCards[0];
        const winningNumbersAndNumbersIHave = gameAndCards[1].split("|");
        this.winningNumbers = winningNumbersAndNumbersIHave[0].split(" ")
            .filter(c => c)
            .map(c => c.trim());
        this.numbersIHave = winningNumbersAndNumbersIHave[1].split(" ")
            .filter(c => c)
            .map(c => c.trim());

    }

    card: string;
    winningNumbers: string[];
    numbersIHave: string[];

    matchingNumbers() {
        return this.numbersIHave.filter(numberIHave => this.winningNumbers.includes(numberIHave));
    }
}

class ScratchCards extends Map<Card, number> {
    add(cards: Card[], amount: number) {
        cards.forEach(card => {
            const existingCardAmount = this.get(card);
            if (existingCardAmount) {
                this.set(card, existingCardAmount + amount);
            } else {
                this.set(card, amount);
            }
        });
    }
}
