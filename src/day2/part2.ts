const fs = require('fs');
const allContents = fs.readFileSync('./src/day2/input.txt', 'utf-8');

function extractNumberAndCodlor(balls: string) {
    const ballsAndColor = balls.trim().split(" ");;

    return { amount: Number.parseInt(ballsAndColor[0]), color: ballsAndColor[1] }
}

function getAmount(redAmount: number, ballsAndColor: { amount: number; color: string }) {
    return redAmount > ballsAndColor.amount ? redAmount : ballsAndColor.amount;
}

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    lines.filter(l => l).forEach(line => {
        const gameAndSets = line.split(":");
        const theGame = gameAndSets[0];
        const sets = gameAndSets[1].split(";");
        let gameResult = true;

        let redAmount = 0;
        let greenAmount = 0;
        let blueAmount = 0;

        for (let i = 0; i < sets.length; i++) {

            const set = sets[i];
            const ballsAndColors = set.split(",");

            for (let ballsAndColorStr of ballsAndColors) {
                const ballsAndColor = extractNumberAndCodlor(ballsAndColorStr);

                switch (ballsAndColor.color) {
                    case "red":
                        redAmount = getAmount(redAmount, ballsAndColor);
                        break
                    case "green":
                        greenAmount = getAmount(greenAmount, ballsAndColor);
                        break
                    case "blue":
                        blueAmount = getAmount(blueAmount, ballsAndColor);
                        break
                }
            }
        }

        if (gameResult) {
            result += blueAmount * redAmount * greenAmount;
        }
    })

    return result;
};
