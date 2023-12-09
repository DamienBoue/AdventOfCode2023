const fs = require('fs');
const allContents = fs.readFileSync('./src/day6/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    const times = Number.parseInt(lines[0].replace("Time:", "").replaceAll(" ", ""));
    const records = Number.parseInt(lines[1].replace("Distance:", "").replaceAll(" ", ""));

    const race = new Race(times, records);
    return race.numberOfWaysToWin();
};

class Race {
    constructor(private readonly maxTime: number, private readonly record: number) {

    }

    numberOfWaysToWin() {
        let numberOfWayToWin = 0;
        for (let speed = 1; speed < this.maxTime; speed++) {
            const remainingTime = this.maxTime - speed;

            if (speed * remainingTime > this.record) {
                numberOfWayToWin++;
            }
        }
        return numberOfWayToWin;
    }
}
