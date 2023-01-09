import renderer from 'react-test-renderer';

import { GameInfo } from '../components/GameInfo';

describe("GameInfo", () => {
    it("renders", () => {
        const actual = renderer.create(
            <GameInfo
                statusMessage={"foo"}
                buttons={"bar"}
            />
        );

        expect(actual).toMatchSnapshot();
    });
});
