import renderer from 'react-test-renderer';

import WeatherDay from '../components/WeatherDay';

it('renders the WeatherDay component correctly', () => {
	const tree = renderer.create(<WeatherDay day={{ date: '2022-10-15', high: 75.3, low: 56.8 }} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
})
