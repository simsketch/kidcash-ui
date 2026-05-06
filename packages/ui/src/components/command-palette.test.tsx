import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CommandPalette, type CommandItem } from './command-palette';

function makeItems(): CommandItem[] {
  return [
    {
      id: 'new-goal',
      label: 'New Goal',
      description: 'Create a savings goal',
      onSelect: vi.fn(),
      group: 'Actions',
    },
    {
      id: 'add-kid',
      label: 'Add Kid',
      description: 'Add a kid to your account',
      onSelect: vi.fn(),
      group: 'Actions',
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Open settings page',
      onSelect: vi.fn(),
      group: 'Navigation',
    },
  ];
}

describe('<CommandPalette>', () => {
  it('renders nothing when open=false', () => {
    render(
      <CommandPalette open={false} onClose={() => {}} items={makeItems()} />,
    );
    expect(screen.queryByTestId('command-palette')).toBeNull();
  });

  it('shows items when open', () => {
    render(
      <CommandPalette open={true} onClose={() => {}} items={makeItems()} />,
    );
    expect(screen.getByText('New Goal')).toBeInTheDocument();
    expect(screen.getByText('Add Kid')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('filters items by search query', () => {
    render(
      <CommandPalette open={true} onClose={() => {}} items={makeItems()} />,
    );
    const input = screen.getByTestId('command-palette-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'kid' } });
    expect(screen.getByText('Add Kid')).toBeInTheDocument();
    expect(screen.queryByText('New Goal')).toBeNull();
    expect(screen.queryByText('Settings')).toBeNull();
  });

  it('moves the selection down on ArrowDown', () => {
    render(
      <CommandPalette open={true} onClose={() => {}} items={makeItems()} />,
    );
    // Default: first item selected.
    expect(
      screen.getByTestId('command-item-new-goal').getAttribute('data-selected'),
    ).toBe('true');

    fireEvent.keyDown(screen.getByTestId('command-palette'), {
      key: 'ArrowDown',
    });
    expect(
      screen.getByTestId('command-item-add-kid').getAttribute('data-selected'),
    ).toBe('true');
  });

  it('Enter calls the selected item onSelect and closes', () => {
    const items = makeItems();
    const onClose = vi.fn();
    render(<CommandPalette open={true} onClose={onClose} items={items} />);
    fireEvent.keyDown(screen.getByTestId('command-palette'), { key: 'Enter' });
    expect(items[0].onSelect).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('Escape calls onClose', () => {
    const onClose = vi.fn();
    render(
      <CommandPalette open={true} onClose={onClose} items={makeItems()} />,
    );
    fireEvent.keyDown(screen.getByTestId('command-palette'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
