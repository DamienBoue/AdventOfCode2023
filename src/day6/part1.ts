const fs = require('fs');
const allContents = fs.readFileSync('./src/day6/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = 0;

    const times = lines[0].replace("Time:", "").trim().split(" ")
        .filter(c => c)
        .map(c => Number.parseInt(c.trim()));
    const records = lines[1].replace("Distance:", "").trim().split(" ")
        .filter(c => c)
        .map(c => Number.parseInt(c.trim()));

    const races: Race[] = []
    for (let i = 0; i < times.length; i++) {
        races.push(new Race(times[i], records[i]));
    }

    return races.reduce( (a,b) => a * b.numberOfWaysToWin() , 1 );
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
