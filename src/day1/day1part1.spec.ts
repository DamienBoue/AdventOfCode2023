import {solution} from "./day1part1";

describe("Day 1", () => {
    it("One line", () => {
        const answer = solution(["1abc2"]);
        expect(answer).toBe(12);
    });

    it("Two lines", () => {
        const answer = solution(["1abc2", "pqr3stu8vwx"]);
        expect(answer).toBe(50);
    });

    it("More lines", () => {
        const answer = solution(["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]);
        expect(answer).toBe(142);
    });

    it("One line hasn't number", () => {
        const answer = solution(["1abc2", "pqr3stu8vwx", "noNumbers", "a1b2c3d4e5f", "treb7uchet"]);
        expect(answer).toBe(142);
    });

    it("Solution", () => {
        const answer = solution();
        expect(answer).toBe(54667);
    });
});
