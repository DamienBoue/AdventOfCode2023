const fs = require('fs');
const allContents = fs.readFileSync('./src/day3/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i];
        const symbolesIndexes = getSymbolesIndexes(currentLine);

        if (symbolesIndexes.length > 0) {
            const previousLine = getPreviousLine(lines, i);
            const nextLine = getNextLine(lines, i);
            symbolesIndexes.forEach(symbolIndex => {
                const closeNumbers1 = findCloseNumbers(previousLine, symbolIndex);
                result += closeNumbers1.number1 + closeNumbers1.number2;
                const closeNumbers2 = findCloseNumbers(currentLine, symbolIndex);
                result += closeNumbers2.number1 + closeNumbers2.number2;
                const closeNumbers3 = findCloseNumbers(nextLine, symbolIndex);
                result += closeNumbers3.number1 + closeNumbers3.number2;
            });
        }
    }

    return result;
};


function getSymbolesIndexes(line: string | undefined) {
    const regex = /([^\.\d]*)/gm
    const indexes: number[] = [];
    if (!line) {
        return indexes;
    }
    let m;
    while ((m = regex.exec(line)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m[0]) {
            indexes.push(m.index);
        }
    }

    return indexes;
}

function getPreviousLine(lines: string[], i: number) {
    if (i === 0) {
        return undefined;
    }

    return lines[i - 1];
}

function getNextLine(lines: string[], i: number) {
    if (i === lines.length - 1) {
        return undefined;
    }

    return lines[i + 1];
}

function isNumeric(character: string | undefined): boolean {
    return character !== undefined && Number.isInteger(Number.parseInt(character));
}

function extractCompleteNumber(line: string, index: number) {
    let numberFound: boolean = isNumeric(line[index]);
    let first = index;
    let last = index;
    while(numberFound) {
        numberFound = false;
        if (first > 0 && isNumeric(line[first - 1])) {
            first--;
            numberFound = true;
        }

        if (last < line.length && isNumeric(line[last + 1])) {
            last++;
            numberFound = true;
        }
    }

    return Number.parseInt(line.slice(first, last + 1));
}

function findCloseNumbers(line: string | undefined, symbolIndex: number): {number1: number, number2: number} {
    if (!line) {
        return {number1: 0, number2: 0};
    }
    let previousCharacterIsNumeric = false;
    let currentCharacterIsNumeric = false;
    let nextCharacterIsNumeric = false;
    if (symbolIndex !== 0) {
        previousCharacterIsNumeric = isNumeric(line[symbolIndex - 1]);
    }
    currentCharacterIsNumeric = isNumeric(line[symbolIndex]);
    if (symbolIndex !== line.length) {
        nextCharacterIsNumeric = isNumeric(line[symbolIndex + 1]);
    }

    let number1;
    let number2;

    if (currentCharacterIsNumeric) {
        number1 = extractCompleteNumber(line, symbolIndex);
    } else if (previousCharacterIsNumeric && !currentCharacterIsNumeric && !nextCharacterIsNumeric) {
        number1 = extractCompleteNumber(line, symbolIndex - 1);
    } else if (!previousCharacterIsNumeric && !currentCharacterIsNumeric && nextCharacterIsNumeric) {
        number1 = extractCompleteNumber(line, symbolIndex + 1);
    } else if (previousCharacterIsNumeric && !currentCharacterIsNumeric && nextCharacterIsNumeric) {
        number1 = extractCompleteNumber(line, symbolIndex - 1);
        number2 = extractCompleteNumber(line, symbolIndex + 1);
    }

    return {number1: number1 ?? 0, number2: number2 ?? 0}
}
