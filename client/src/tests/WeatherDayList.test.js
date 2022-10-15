import renderer from 'react-test-renderer';

import WeatherDayList from '../components/WeatherDayList';

it('renders the WeatherDayList correctly with weather data', () => {
	const statusMessage = 'Showing results for Denver, Colorado, United States';
	const data = [
		{ date: '2022-10-15', high: 60.1, low: 50.2 },
		{ date: '2022-10-16', high: 61.1, low: 51.2 },
		{ date: '2022-10-17', high: 62.1, low: 52.2 }
	];
	const tree = renderer.create(<WeatherDayList statusMessage={statusMessage} weatherDays={data} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders the WeatherDayList correctly with an empty array for data', () => {
	const statusMessage = 'No results found';
	const tree = renderer.create(<WeatherDayList statusMessage={statusMessage} weatherDays={[]} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});