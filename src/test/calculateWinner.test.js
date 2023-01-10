import { calculateWinner } from "../utils/calculateWinner";

describe("calculateWinner", () => {
    it("given squares without a winning configuration, returns null values", () => {
        const squares = [
            null, 'a', null,
            'a', null, null,
            null, null, 'a',
        ];

        const actual = calculateWinner(squares);

        expect(actual).toStrictEqual({
            winner: null,
            winningSquares: null,
        });
    });

    describe("given inputs with a winning configuration, returns winning mark and configuration", () => {
        it.each([
            ["top row", ['a', 'a', 'a', null, null, null, null, null, null], [0, 1, 2]],
            ["middle row", [null, null, null, 'a', 'a', 'a', null, null, null], [3, 4, 5]],
            ["bottom row", [null, null, null, null, null, null, 'a', 'a', 'a'], [6, 7, 8]],
            ["first column", ['a', null, null, 'a', null, null, 'a', null, null], [0, 3, 6]],
            ["second column", [null, 'a', null, null, 'a', null, null, 'a', null], [1, 4, 7]],
            ["third column", [null, null, 'a', null, null, 'a', null, null, 'a'], [2, 5, 8]],
            ["first diagonal", ['a', null, null, null, 'a', null, null, null, 'a'], [0, 4, 8]],
            ["second diagonal", [null, null, 'a', null, 'a', null, 'a', null, null], [2, 4, 6]],
        ])("%s", (_testDescription, squares, expectedWinningSquares) => {
            const actual = calculateWinner(squares);

            expect(actual).toStrictEqual({
                winner: 'a',
                winningSquares: expectedWinningSquares,
            });
        });
    });
});