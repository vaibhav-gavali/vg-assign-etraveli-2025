import { createSlice } from '@reduxjs/toolkit';

const MOVIE_STATE = 'movie';

export const initialState = {
    list: [],
    currentMovieIndex: null,

    charactersList: [],
    charactersLoading: false,
    charactersLoaded: false,
};

export const movieSlice = createSlice({
    name: [MOVIE_STATE],
    initialState,
    reducers: {
        setMovieListSuccess: (state, action) => {
            state.list = action.payload;
        },
        setMovieListFailure: (state) => {
            state.list = [];
        },
        selectSingleMovie: (state, action) => {
            state.currentMovieIndex = action.payload;
            state.charactersLoaded = false;
        },
        setMovieCharactersSuccess: (state, action) => {
            state.charactersList = action.payload;
        },
        setMovieCharactersFailure: (state) => {
            state.charactersList = [];
        },
    },
});

export const { getMovieList, setMovieListSuccess, setMovieListFailure, selectSingleMovie, setMovieCharactersSuccess, setMovieCharactersFailure } =
    movieSlice.actions

export default movieSlice.reducer;