import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const MOVIE_STATE = 'movie';

// Define the type for the initial state of the Movie slice
interface InitialMovieState {
    list: any[],
    currentMovieIndex: number | null,
    charactersList: any[],
}

export const initialState: InitialMovieState = {
    list: [],
    currentMovieIndex: null,
    charactersList: [],
};

export const movieSlice = createSlice({
    name: MOVIE_STATE,
    initialState,
    reducers: {
        setMovieListSuccess: (state, action: PayloadAction<any[]>) => {
            state.list = action.payload;
        },
        setMovieListFailure: (state) => {
            state.list = [];
        },
        selectSingleMovie: (state, action: PayloadAction<number | null>) => {
            state.currentMovieIndex = action.payload;
        },
        setMovieCharactersSuccess: (state, action: PayloadAction<any[]>) => {
            state.charactersList = action.payload;
        },
        setMovieCharactersFailure: (state) => {
            state.charactersList = [];
        },
        setMoviePosterListSuccess: (state, action: PayloadAction<any[]>) => {
            const postersData = action.payload;
            state.list = state.list.map((movieItem) => {
                const postedDataObj = postersData.find((posterObj) => posterObj.Title.includes(movieItem?.title))
                return { ...movieItem, posterInfo: postedDataObj }
            })
        },
    },
});

export const { setMovieListSuccess, setMovieListFailure, selectSingleMovie, setMovieCharactersSuccess, setMovieCharactersFailure, setMoviePosterListSuccess } =
    movieSlice.actions

export default movieSlice.reducer;