const fs = require('fs');
const allContents = fs.readFileSync('./src/day5/input.txt', 'utf-8');

export const solution = (lines: string[] = allContents.split(/\r?\n/)) => {
    let result = Number.MAX_VALUE;
    const seeds = new Seeds(lines.splice(0, 2)[0]);
    const seedToSoil = new AMap(extractNextBlock(lines)!);
    const soilToFertilizer = new AMap(extractNextBlock(lines)!);
    const fertilizerToWater = new AMap(extractNextBlock(lines)!);
    const waterToLight = new AMap(extractNextBlock(lines)!);
    const lightToTemperature = new AMap(extractNextBlock(lines)!);
    const temperatureToHumidity = new AMap(extractNextBlock(lines)!);
    const humidityToLocation = new AMap(extractNextBlock(lines)!);

    // const locations: number[] = []
    seeds.values.forEach(seed => {
        console.log(seed);
        for (let i = 0; i < seed.limit; i++) {
            const soil = seedToSoil.reach(seed.value + i);
            const fertilizer = soilToFertilizer.reach(soil);
            const water = fertilizerToWater.reach(fertilizer);
            const light = waterToLight.reach(water);
            const temperature = lightToTemperature.reach(light);
            const humidity = temperatureToHumidity.reach(temperature);
            const location = humidityToLocation.reach(humidity);

            result = location < result ? location : result;
        }
    })


    return result;
};

class Seeds {
    public values: { value: number, limit: number }[] = [];

    constructor(line: string) {
        const allNumbers = line.replace("seeds:", "").trim().split(" ")
            .map(s => Number.parseInt(s));

        for (let i = 0; i < allNumbers.length; i = i + 2) {
            this.values.push({ value: allNumbers[i], limit: allNumbers[i + 1]})
        }
    }
}

class AMap {
    private name: string;
    private linesMap: Mapping[] = [];

    constructor(lines: string[]) {
        this.name = lines[0].replace("map:", "").trim();

        for (let i = 1; i < lines.length - 1; i++) {
            const line = lines[i];
            const elements = line.split(" ");
            const destination = Number.parseInt(elements[0]);
            const source = Number.parseInt(elements[1]);
            const range = Number.parseInt(elements[2]);

            this.linesMap.push(new Mapping(source, destination, range))
        }
    }

    reach(reach: number) {
        const reached = this.linesMap.map(line => {
            return line.reach(reach);
        }).find(destination => destination !== undefined);

        if (!reached) {
            return reach;
        }

        return reached;
    }
}

class Mapping {
    constructor(private source: number,  private destination: number, private range: number) {

    }

    reach(reach: number) {
        if (this.source <= reach && (this.source + this.range) >= reach) {
            return this.destination + (reach - this.source);
        }

        return undefined;
    }
}

function extractNextBlock(lines: string[]) {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i]) {
            continue;
        }

        return lines.splice(0, i + 1)
    }
}

