import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from '../App';

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

beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockData)
	});
});

afterEach(() => {
	jest.restoreAllMocks();
});

test('renders Weather text', () => {
  render(<App />);
  const text = screen.getByText(/Weather/i);
  expect(text).toBeInTheDocument();
});


it('renders App component correctly in its default state', () => {
	const tree = renderer.create(<App />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});


it('has the expected data after searching for a term and clicking submit', async () => {
	render(<App />);
	const searchField = screen.getByTestId('searchField');
	// Confirm empty search field
	expect(searchField.value).toBe('');
	fireEvent.change(searchField, { target: { value: 'Denver' }});
	expect(searchField.value).toBe('Denver')

	const submitBtn = screen.getByTestId('submitBtn');
	fireEvent.click(submitBtn);
	
	// Confirm successful status message
	await screen.findByText('Showing results for Denver, Colorado, United States');
	// Confirm there are 3 div elements corresponding to the expected rendered data
	const divs = screen.queryAllByText(/2022/i);
	expect(divs).toHaveLength(3);
	// Search field should still have Denver after render
	expect(searchField.value).toBe('Denver');
});