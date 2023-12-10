import {solution} from "./part1";

describe("Day 6", () => {
    it.each([
      [["32T3K 765",
        "T55J5 684",
        "KK677 28",
        "KTJJT 220",
        "QQQJA 483"], 6440],
    ])
    ("One line", (lines, result) => {
        const answer = solution(lines);
        expect(answer).toBe(result);
    });

    it("Solution", () => {
        const answer = solution();
        expect(answer).toBe(251545216);
    });
});
