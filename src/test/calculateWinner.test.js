import { calculateWinner } from "../utils/calculateWinner";

describe(calculateWinner.name, () => {
    describe("given inputs without a winning configuration, returns null values", () => {
        it("all null squares", () => {
            const squares = [
                null, null, null,
                null, null, null,
                null, null, null,
            ];

            const actual = calculateWinner(squares);

            expect(actual).toStrictEqual({
                winner: null,
                winningSquares: null,
            });
        });
    });

    describe("given inputs with a winning configuration, returns winning mark and configuration", () => {
        it("top row", () => {
            const squares = [
                'a', 'a', 'a',
                null, null, null,
                null, null, null,
            ];

            const actual = calculateWinner(squares);

            expect(actual).toStrictEqual({
                winner: 'a',
                winningSquares: [0, 1, 2],
            });
        });
    });
});