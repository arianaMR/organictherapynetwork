import { screen, render } from 'test-utils';
import React from 'react';

it('works without any providers', () => {
  const UI = () => <div>works</div>;
  render(<UI />);
  expect(screen.getByText(/works/)).toBeInTheDocument();
});
