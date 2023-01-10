import renderer from 'react-test-renderer';

import { Game } from '../components/Game';

describe("Game", () => {
    it("renders", () => {
        const actual = renderer.create(
            <Game/>
        );

        expect(actual).toMatchSnapshot();
    })
})
