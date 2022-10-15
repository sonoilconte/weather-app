import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from '../App';

test('renders Weather text', () => {
  render(<App />);
  const text = screen.getByText(/Weather/i);
  expect(text).toBeInTheDocument();
});


it('renders App component correctly', () => {
	const tree = renderer.create(<App />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});