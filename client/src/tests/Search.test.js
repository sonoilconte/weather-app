import renderer from 'react-test-renderer';

import Search from '../components/Search';

it('renders the Search component correctly', () => {
	const tree = renderer.create(<Search />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});