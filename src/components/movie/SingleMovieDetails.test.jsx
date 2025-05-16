import React from 'react';
import { screen, act } from '@testing-library/react';
import { initialState as movieInitialState } from '../../redux/slices/movieSlice';
import { renderWithProviders } from '../../utils/testing/test-util';
import { getCharactersList, getMoviesList } from '../../utils/testing/test-resource.rsc';
import SingleMovieDetails from './SingleMovieDetails';
import { setMovieCharactersSuccess } from '../../redux/slices/movieSlice';

describe('MovieComponent Unit Tests', () => {
  test('loading component present in case of get characters API call', () => {
    // // try to mock useEffect api calls
    // const setCharactersLoading = vi.fn();
    // vi.spyOn(React, 'useState').mockImplementationOnce(() => [true, setCharactersLoading]);

    const initialMovieState = {
      ...movieInitialState,
      list: getMoviesList(),
      currentMovieIndex: 4
    };

    renderWithProviders(<SingleMovieDetails />, {
      preloadedState: {
        movieStore: initialMovieState,
      },
    });


    const todoItem = screen.getByTestId('characters-loading');
    expect(todoItem).toBeInTheDocument();
  });

  test('empty component present in case of get characters API call', () => {
    const initialMovieState = { ...movieInitialState, currentMovieIndex: 4 };
    const { store } = renderWithProviders(<SingleMovieDetails />, {
      preloadedState: {
        movieStore: initialMovieState,
      },
    });

    // try to mock redux calls
    act(() => {
      store.dispatch(setMovieCharactersSuccess([]));
    });

    const todoItem = screen.getByTestId('characters-loaded-empty');
    expect(todoItem).toBeInTheDocument();
  });

  test('proper component present in case of get characters API call', () => {
    const initialMovieState = { ...movieInitialState, currentMovieIndex: 4 };
    const { store } = renderWithProviders(<SingleMovieDetails />, {
      preloadedState: {
        movieStore: initialMovieState,
      },
    });

    // try to mock redux calls
    act(() => {
      store.dispatch(setMovieCharactersSuccess(getCharactersList()));
    });

    const todoItem = screen.getByTestId('characters-loaded');
    expect(todoItem).toBeInTheDocument();
  });
});
