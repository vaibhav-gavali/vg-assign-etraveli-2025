import { cleanup, screen, within } from '@testing-library/react';
import { getMoviesList } from '../../utils/testing/test-resource.rsc';
import { renderWithProviders } from '../../utils/testing/test-util';
import MoviesListComponent from './MoviesListComponent';
import { initialState as movieInitialState } from '../../redux/slices/movieSlice';
import { initialState as headerInitialState } from '../../redux/slices/headerSlice';

afterEach(() => cleanup());

describe('MoviesListComponent Unit Tests', () => {
  test('Fallback message displayed when no movies are present after filtering by title', () => {
    const initialMovieState = {
      ...movieInitialState,
      list: getMoviesList(),
    };
    const initialHeaderState = {
      ...headerInitialState,
      searchBy: 'demo',
    };

    renderWithProviders(<MoviesListComponent />, {
      preloadedState: {
        movieStore: initialMovieState,
        headerStore: initialHeaderState,
      },
    });

    expect(screen.getByText('No Movie(s) Found')).toBeInTheDocument();
  });

  test('Proper list of movies displayed if movies are present', () => {
    const initialMovieState = {
      ...movieInitialState,
      list: getMoviesList(),
    };
    const initialHeaderState = {
      ...headerInitialState,
      searchBy: 're',
      sortBy: 'episode_id',
    };

    renderWithProviders(<MoviesListComponent />, {
      preloadedState: {
        movieStore: initialMovieState,
        headerStore: initialHeaderState,
      },
    });

    const elements = screen.getAllByTestId('movie-item');
    expect(elements.length).toBe(3);
  });

  ['episode_id', 'release_date'].forEach((option) => {
    test(`Movie list sorted correctly if ${option} selected`, () => {
      const initialHeaderState = { ...headerInitialState, sortBy: option };
      const initialMovieState = {
        ...movieInitialState,
        list: getMoviesList(),
      };
      renderWithProviders(<MoviesListComponent />, {
        preloadedState: {
          headerStore: initialHeaderState,
          movieStore: initialMovieState,
        },
      });

      const elements = screen.getAllByTestId('movie-item');
      const testId =
        option === 'episode_id' ? 'movie-episodeId' : 'movie-releaseDate';

      const elementToCheck = within(elements[0]).getByTestId(testId);
      const valueToCheck = option === 'episode_id' ? 'EPISODE 1' : '1977-05-25';

      expect(elementToCheck).toHaveTextContent(valueToCheck);
    });
  });
});
