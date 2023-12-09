import {solution} from "./part2";

describe("Day 6", () => {
    it.each([
        [["Time:      7  15   30",
          "Distance:  9  40  200"], 71503],
    ])
    ("One line", (lines, result) => {
        const answer = solution(lines);
        expect(answer).toBe(result);
    });

    it("Solution", () => {
        const answer = solution();
        expect(answer).toBe(160816);
    });
});
