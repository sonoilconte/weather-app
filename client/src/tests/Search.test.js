import renderer from 'react-test-renderer';

import Search from '../components/Search';

it('renders the Search component correctly', () => {
    const tree = renderer.create(
        <Search
            onSearchTermChange={jest.fn()}
            onSearchTermSubmit={jest.fn()}
        />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
