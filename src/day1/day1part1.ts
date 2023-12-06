const fs = require('fs');
const allContents = fs.readFileSync('./src/day1/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;
    for (let line of lines) {
        let allCharacters = line.split("");
        let number1: string | undefined = undefined;
        let number2: string | undefined = undefined;

        for (let i = 0; i < allCharacters.length; i++) {
            let character = allCharacters[i];
            if (Number.isInteger(Number.parseInt(character))) {
                if (!number1) {
                    number1 = character;
                } else {
                    number2 = character;
                }
            }
        }

        if (!number2) {
            number2 = number1!;
        }

        if (number1 && number2) {
            result += Number.parseInt(number1! + number2!);
        }
    }
    return result;
};
