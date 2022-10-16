import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from '../App';

afterEach(() => {
	jest.restoreAllMocks();
});

it('renders App component correctly in its default state', () => {
	const tree = renderer.create(<App />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders the expected data when we enter a valid search term and click submit', async () => {
	const mockData = {
		city: 'Denver',
		state: 'Colorado',
		country: 'United States',
		days: [
			{
				date: '2022-10-15',
				high: 62.7,
				low: 36.5
			},
			{
				date: '2022-10-16',
				high: 56.7,
				low: 42.6
			},
			{
				date: '2022-10-17',
				high: 63.9,
				low: 33.9
			},
		]
	};
	const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockData)
	});

	render(<App />);
	const searchField = screen.getByTestId('searchField');
	expect(searchField.value).toBe('');
	fireEvent.change(searchField, { target: { value: 'Denver' }});
	expect(searchField.value).toBe('Denver')

	const submitBtn = screen.getByTestId('submitBtn');
	fireEvent.click(submitBtn);
	
	// Confirm successful status message
	await screen.findByText('Showing results for Denver, Colorado, United States');
	expect(fetchMock).toHaveBeenCalledWith('/api?location=Denver');
	// Confirm there are 3 div elements corresponding to the expected rendered data
	const divs = screen.queryAllByText(/2022/i);
	expect(divs).toHaveLength(3);
	// Search field should still have Denver after render
	expect(searchField.value).toBe('Denver');
});

it('renders the expected content when we enter an invalid search term and click submit', async () => {
	const mockData = {
		days: [],
	};
	const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockData)
	});
	render(<App />);
	const searchField = screen.getByTestId('searchField');
	// Confirm empty search field
	expect(searchField.value).toBe('');
	fireEvent.change(searchField, { target: { value: '#$%' } });
	expect(searchField.value).toBe('#$%');

	const submitBtn = screen.getByTestId('submitBtn');
	fireEvent.click(submitBtn);

	// Confirm status message No results found
	await screen.findByText('No results found');
	expect(fetchMock).toHaveBeenCalledWith('/api?location=#$%');
	// Confirm there are 0 div elements corresponding to any rendered data
	const divs = screen.queryAllByText(/2022/i);
	expect(divs).toHaveLength(0);
	// Search field should still have #$% after render
	expect(searchField.value).toBe('#$%');
});

it('renders the expected content when there is an error calling the API', async () => {
	const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Some server error'));
	render(<App />);

	const submitBtn = screen.getByTestId('submitBtn');
	fireEvent.click(submitBtn);

	await screen.findByText('Sorry, something went wrong!');
	expect(fetchMock).toHaveBeenCalledTimes(1);
	// Confirm there are 0 div elements corresponding to any rendered data
	const divs = screen.queryAllByText(/2022/i);
	expect(divs).toHaveLength(0);
});

// Could separate out the test that is confirming called with correct argument