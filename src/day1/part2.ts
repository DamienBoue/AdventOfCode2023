const fs = require('fs');
const allContents = fs.readFileSync('./src/day1/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    for (let line of lines) {

        let numbers = extractAllNumbers(line);
        if (numbers.number1 && numbers.number2) {
            result += Number.parseInt(numbers.number1 + numbers.number2);
        }
    }
    return result;
};

function extractAllNumbers(line: string) {
    const regex = /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/gm;

    let number1: string | undefined = undefined;
    let number2: string | undefined = undefined;

    let m;
    while ((m = regex.exec(line)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        let number = toNumber(m[1]);

        if (number) {
            if (!number1) {
                number1 = number.toString();
            } else {
                number2 = number.toString();
            }
        }
    }

    return {number1: number1, number2: number2 ?? number1};
}

function toNumber(number: string) {
    if (Number.isInteger(Number.parseInt(number))) {
        return Number.parseInt(number)
    }

    switch (number) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
    }
}
