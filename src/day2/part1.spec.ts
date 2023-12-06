import {solution} from "./part1";

describe("Day 2", () => {
    it.each([
        [["Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"], 1],
        [["Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"], 2],
        [["Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"], 0],
        [["Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"], 0],
        [["Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"], 5],
        [["Game 91: 2 blue, 17 red, 6 green; 1 green, 1 blue, 6 red; 6 red, 4 blue; 10 green, 14 red, 1 blue; 7 blue, 10 green, 10 red; 16 red, 11 green, 9 blue"], 0],
        [["Game 101: 11 red, 13 blue, 12 green; 1 blue, 1 red, 1 green"], 101],
    ])
    ("One line", (lines, result) => {
        const answer = solution(lines);
        expect(answer).toBe(result);
    });

    it("Two lines", () => {
        const answer = solution(["Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"]);
        expect(answer).toBe(3);
    });

    it("More lines", () => {
        const answer = solution([
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
            "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
            "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
            "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
            "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        ]);
        expect(answer).toBe(8);
    });

    it("Solution", () => {
        const answer = solution();
        expect(answer).toBe(54667);
    });
});
