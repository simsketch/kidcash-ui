import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnimatedBalance } from './animated-balance';

describe('<AnimatedBalance>', () => {
  it('renders the value formatted as USD by default', () => {
    render(<AnimatedBalance value={1234.5} duration={0} />);
    // en-US / USD → "$1,234.50"
    expect(screen.getByText('$1,234.50')).toBeInTheDocument();
  });

  it('accepts a custom currency + locale', () => {
    render(<AnimatedBalance value={1000} duration={0} currency="EUR" locale="de-DE" />);
    // de-DE / EUR formatting includes the EUR sign and a comma decimal
    const node = screen.getByText(/1\.000,00/);
    expect(node).toBeInTheDocument();
    expect(node.textContent).toContain('€');
  });
});
