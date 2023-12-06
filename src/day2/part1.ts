const fs = require('fs');
const allContents = fs.readFileSync('./src/day2/input.txt', 'utf-8');

function extractNumberAndCodlor(balls: string) {
    const ballsAndColor = balls.trim().split(" ");;

    return { amount: Number.parseInt(ballsAndColor[0]), color: ballsAndColor[1] }
}

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    lines.filter(l => l).forEach(line => {
        const gameAndSets = line.split(":");
        const theGame = gameAndSets[0];
        const sets = gameAndSets[1].split(";");
        let gameResult = true;

        for (let i = 0; i < sets.length; i++) {
            let redAmount = 12;
            let greenAmount = 13;
            let blueAmount = 14

            const set = sets[i];
            const ballsAndColors = set.split(",");

            for (let ballsAndColorStr of ballsAndColors) {
                const ballsAndColor = extractNumberAndCodlor(ballsAndColorStr);

                switch (ballsAndColor.color) {
                    case "red":
                        redAmount -= ballsAndColor.amount;
                        break
                    case "green":
                        greenAmount -= ballsAndColor.amount;
                        break
                    case "blue":
                        blueAmount -= ballsAndColor.amount;
                        break
                }
            }

            if (redAmount < 0 || greenAmount < 0 || blueAmount < 0) {
                gameResult = false;
                break;
            }
        }

        if (gameResult) {
            result += Number.parseInt(theGame.trim().replace("Game", "").trim())
        }
    })

    return result;
};
