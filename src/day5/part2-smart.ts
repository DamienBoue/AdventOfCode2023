const fs = require('fs');
const allContents = fs.readFileSync('./src/day5/input.txt', 'utf-8');

async function processSeed(seed: {
    value: number;
    limit: number
}, seedToSoil: AMap, soilToFertilizer: AMap, fertilizerToWater: AMap, waterToLight: AMap, lightToTemperature: AMap, temperatureToHumidity: AMap, humidityToLocation: AMap, result: number) {
    const soil = await seedToSoil.reach(seed);
    const fertilizer = await soilToFertilizer.reach(soil);
    const water = await fertilizerToWater.reach(fertilizer);
    const light = await waterToLight.reach(water);
    const temperature = await lightToTemperature.reach(light);
    const humidity = await temperatureToHumidity.reach(temperature);
    const location = await humidityToLocation.reach(humidity);

    result = location.value < result ? location.value : result;

    return result;
}

export const solution = async (lines: string[] = allContents.split(/\r?\n/)) => {
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
    const seedpromises = seeds.values.map(seed => {
        return processSeed(seed, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation, result);
    });

    const numbers = await Promise.all(seedpromises);
    result = Math.min(...numbers)

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

    async reach(reach: { value: number; limit: number }) {
        const reachedPromise = this.linesMap.map(async line => {
            return line.reach(reach);
        });

        const reached = (await Promise.all(reachedPromise))
            .find(destination => destination !== undefined);

        if (!reached) {
            return reach;
        }

        return reached;
    }
}

class Mapping {
    constructor(private source: number,  private destination: number, private range: number) {

    }

    async reach(reach: { value: number; limit: number }) {
        if (this.source < reach.value) {
            if (this.source + this.range >= reach.value) {
                let value = reach.value + ((this.source + this.range) - reach.value) - reach.limit;
                value--;
                return {value, limit: 1};
            } else {
                return undefined
            }
        } else if (this.source > reach.value) {
            if (this.source > reach.value + reach.limit) {
                return undefined;
            } else {
                return undefined;
            }
        } else if (this.source === reach.value) {
            return { value: this.destination + (reach.value - this.source), limit: 1 };
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

