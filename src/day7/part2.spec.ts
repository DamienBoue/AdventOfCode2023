import {solution} from "./part2";

describe("Day 6", () => {
    it.each([
      [["32T3K 765",
        "T55J5 684",
        "KK677 28",
        "KTJJT 220",
        "QQQJA 483"], 5905],
    ])
    ("One line", (lines, result) => {
        const answer = solution(lines);
        expect(answer).toBe(result);
    });

    it("Solution", () => {
        const answer = solution();
        expect(answer).toBe(250384185);
    });
});
