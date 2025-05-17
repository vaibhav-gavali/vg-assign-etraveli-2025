import { createSelector } from 'reselect';
import { SORT_OPTIONS } from '../components/header/SortComponent';

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
            const sortOpr = SORT_OPTIONS.find((obj) => obj.value === sortValue)?.sort ?? 'asc';

            newList = newList.sort((movie1, movie2) => {
                let value1 = movie1?.[sortValue];
                let value2 = movie2?.[sortValue];
                // For imdbRating we need to get data from another object
                if (sortValue === 'imdbRating') {
                    value1 = movie1?.posterInfo?.[sortValue];
                    value2 = movie2?.posterInfo?.[sortValue];
                }

                if (value1 === "N/A") return 1;
                if (value2 === "N/A") return -1;
                // Custom sort for Dates
                if (sortValue === 'release_date' && sortOpr === 'desc') {
                    return new Date(value2).getTime() - new Date(value1).getTime()
                }
                // All other values where we can sort using normal integer/strings
                return sortOpr === 'asc' ? value1 - value2 : value2 - value1;

            });
        }

        return newList;
    }
);

export const charactersListSelector = createSelector(
    movieStateSelector,
    (movieState) => movieState.charactersList || []
);