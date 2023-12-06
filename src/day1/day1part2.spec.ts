import {solution} from "./day1part2";

describe("Day 1 part 2", () => {
    it("One line", () => {
        const answer = solution(["two1nine"]);
        expect(answer).toBe(29);
    });

    it("Two lines", () => {
        const answer = solution(["two1nine", "eightwothree"]);
        expect(answer).toBe(29+83);
    });

    it("More lines", () => {
        const answer = solution(["two1nine", "eightwothree", "abcone2threexyz", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen"]);
        expect(answer).toBe(29 + 83 + 13 + 24 + 42 + 14 + 76);
    });

    it
    .each([
        ["two1nine",29],
        ["eightwothree",83],
        ["abcone2threexyz",13],
        ["xtwone3four",24],
        ["4nineeightseven2",42],
        ["zoneight234",14],
        ["7pqrstsixteen", 76],
        ["oneight", 18],
        ["twone", 21],
        ["threeight", 38],
        ["fiveight", 58],
        ["sevenine", 79],
        ["eightwo", 82],
        ["eighthree", 83],
        ["nineight", 98],
        ["one", 11],
        ["two", 22],
        ["three", 33],
        ["four", 44],
        ["five", 55],
        ["six", 66],
        ["seven", 77],
        ["eight", 88],
        ["nine", 99],
    ])
    ("All lines", (line: string, expected: number) => {
        const answer = solution([line]);
        expect(answer).toBe(expected);
    });

    it("One line hasn't number", () => {
        const answer = solution(["two1nine", "eightwothree", "abcone2threexyz", "noNumbers", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen"]);
        expect(answer).toBe(29 + 83 + 13 + 24 + 42 + 14 + 76);
    });

    it("Solution", () => {
        const answer = solution();
        expect(answer).toBe(54203);
    });
});
