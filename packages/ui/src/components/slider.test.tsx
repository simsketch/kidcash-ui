import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './slider';

describe('<Slider>', () => {
  it('renders the current value', () => {
    render(<Slider value={42} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toHaveValue('42');
  });

  it('calls onChange when the underlying input changes', () => {
    const onChange = vi.fn();
    render(<Slider value={10} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '55' } });
    expect(onChange).toHaveBeenCalledWith(55);
  });

  it('renders the label when provided', () => {
    render(<Slider value={10} onChange={() => {}} label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders the value when showValue=true', () => {
    render(<Slider value={73} onChange={() => {}} showValue />);
    expect(screen.getByText('73')).toBeInTheDocument();
  });
});
