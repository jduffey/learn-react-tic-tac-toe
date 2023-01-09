import renderer from 'react-test-renderer';

import { Square } from "../components/Square";

describe("Square", () => {
    it("given isWinningSquare is true, sets background color to lightgreen", () => {
        const actual = renderer.create(
            <Square
                onClick={() => "foo"}
                playerMark={"bar"}
                isWinningSquare={true}
            />
        );

        expect(actual).toMatchSnapshot();
    });

    it("given isWinningSquare is false, sets background color to inherit", () => {
        const actual = renderer.create(
            <Square
                onClick={() => "foo"}
                playerMark={"bar"}
                isWinningSquare={false}
            />
        );

        expect(actual).toMatchSnapshot();
    });
})