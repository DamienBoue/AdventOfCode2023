import {solution} from "./part1";

describe("Day 3", () => {
    it.each([
        [  ["467..114..",
            "...*......",
            "..35..633.",
            "......#...",
            "617*......",
            ".....+.58.",
            "..592.....",
            "......755.",
            "...$.*....",
            ".664.598.."], 4361]
    ])
    ("One line", (lines, result) => {
        const answer = solution(lines);
        expect(answer).toBe(result);
    });


    it("Solution", () => {
        const answer = solution();
        expect(answer).toBe(531561);
    });
});
