import renderer from 'react-test-renderer';

import { Board } from '../components/Board';

describe("Board", () => {
    it("renders", () => {
        const onClick = () => "foo";
        const squares = ["a", "b", "c", "a", "e", "f", "a", "h", "i"];
        const winningSquares = [0, 3, 6];

        const actual = renderer.create(
            <Board
                squares={squares}
                onClick={onClick}
                winningSquares={winningSquares}
            />
        );

        expect(actual).toMatchSnapshot();
    });

    it("renders if winningSquares is null", () => {
        const onClick = () => "foo";
        const squares = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
        const winningSquares = null;

        const actual = renderer.create(
            <Board
                squares={squares}
                onClick={onClick}
                winningSquares={winningSquares}
            />
        );

        expect(actual).toMatchSnapshot();
    });
});
