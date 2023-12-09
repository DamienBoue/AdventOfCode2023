import {solution} from "./part1";

describe("Day 6", () => {
    it.each([
        [["Time:      7",
          "Distance:  9"], 4],
        [["Time:      15",
          "Distance:  40"], 8],
        [["Time:      30",
          "Distance:  200"], 9],
        [["Time:      7  15   30",
          "Distance:  9  40  200"], 288],
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
