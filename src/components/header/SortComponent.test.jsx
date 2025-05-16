import { cleanup, screen, fireEvent, within } from '@testing-library/react';
import { initialState as headerInitialState } from '../../redux/slices/headerSlice';
import SortComponent, { SORT_OPTIONS } from './SortComponent';
import { renderWithProviders } from '../../utils/testing/test-util';

// Reset any runtime request handlers we may add during the tests.
afterEach(() => cleanup());

describe('SortComponent Unit Tests', () => {
  test('Sort options are showing correctly', () => {
    const initialHeaderState = { ...headerInitialState };
    renderWithProviders(<SortComponent />, {
      preloadedState: {
        headerStore: initialHeaderState,
      },
    });

    fireEvent.click(screen.getByTestId('drop-btn'));
    expect(screen.getAllByText('Episode').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Year').length).toBeGreaterThan(0);
  });

  ['episode_id', 'release_date'].forEach((option) => {
    test(`Sort option is showing a checked icon if ${option} selected`, () => {
      const initialHeaderState = { ...headerInitialState, sortBy: option };
      renderWithProviders(<SortComponent />, {
        preloadedState: {
          headerStore: initialHeaderState,
        },
      });

      const label = SORT_OPTIONS.find((item) => item.value === option)?.label;

      fireEvent.click(screen.getByTestId('drop-btn'));

      // Get respective container
      const containerElement = screen.getByTestId('drop-list-wrapper');
      // Search by label
      const element = within(containerElement).getByText(label);
      expect(element).toBeInTheDocument();

      const checked = within(element).getAllByTestId('checked');
      expect(checked.length).toBe(1);
    });
  });
});
