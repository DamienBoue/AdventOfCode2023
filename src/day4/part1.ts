const fs = require('fs');
const allContents = fs.readFileSync('./src/day4/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    lines.filter(l => l).forEach(line => {
        const gameAndCards = line.split(":");
        const theGame = gameAndCards[0];
        const winningNumbersAndNumbersIHave = gameAndCards[1].split("|");
        const winningNumbers = winningNumbersAndNumbersIHave[0].split(" ")
            .filter(c => c)
            .map(c => c.trim());
        const numbersIHave = winningNumbersAndNumbersIHave[1].split(" ")
            .filter(c => c)
            .map(c => c.trim());

        const winningNumbersIhave = numbersIHave.filter(numberIHave => winningNumbers.includes(numberIHave));
        const matchesCount = winningNumbersIhave.length;

        let total = 0;
        if (matchesCount > 0) {
            total = 1
            for (let i = 1; i < matchesCount; i++) {
                total = total * 2;
            }
        }


        result += total;
    })

    return result;
};
