import { createSelector } from 'reselect';

export const headerStateSelector = (state) => state.headerStore;
export const movieStateSelector = (state) => state.movieStore;

export const getSearchValueSelector = createSelector(
    headerStateSelector,
    (headerState) => headerState.searchBy || ''
);

export const getFilterValueSelector = createSelector(
    headerStateSelector,
    (headerState) => headerState.filterBy || ''
);

export const getSortValueSelector = createSelector(
    headerStateSelector,
    (headerState) => headerState.sortBy || ''
);

export const movieListSelector = createSelector(
    movieStateSelector,
    (movieState) => movieState.list || []
);

export const currentMovieIndexSelector = createSelector(
    movieStateSelector,
    (movieState) => movieState.currentMovieIndex || 0
);

export const currentMovieDetailsSelector = createSelector(
    movieListSelector,
    currentMovieIndexSelector,
    (list, currentMovieIndex) =>
        list.find((movie) => movie.episode_id === currentMovieIndex) || {}
);

export const filteredMoviesSelector = createSelector(
    movieListSelector,
    getSortValueSelector,
    getSearchValueSelector,
    getFilterValueSelector,
    (list, sortValue, searchValue, filterValue) => {
        let newList = [...list];

        if (searchValue) {
            newList = newList.filter((movie) =>
                movie[filterValue].toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        if (sortValue) {
            newList = newList.sort((movie1, movie2) => {
                return movie1[sortValue] - movie2[sortValue]; // ascending order
            });
        }

        return newList;
    }
);

export const charactersListSelector = createSelector(
    movieStateSelector,
    (movieState) => movieState.charactersList || []
);