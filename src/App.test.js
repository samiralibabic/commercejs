import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Navbar component', () => {
  // arrange
  render(<App />);

  // act
  const navBarElement = screen.getByTestId('navbar');

  // assert
  expect(navBarElement).toBeInTheDocument();
});
