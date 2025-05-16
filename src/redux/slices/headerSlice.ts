import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const HEADER_STATE = 'header';

// Define the type for the initial state of the Header slice
interface InitialHeaderState {
    sortBy: string;
    searchBy: string;
    filterBy: string;
}

export const initialState: InitialHeaderState = {
    sortBy: 'episode_id',
    searchBy: '',
    filterBy: 'title',
};

export const headerSlice = createSlice({
    name: HEADER_STATE,
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setSearchBy: (state, action: PayloadAction<string>) => {
            state.searchBy = action.payload;
        },
        setFilterBy: (state, action: PayloadAction<string>) => {
            state.filterBy = action.payload;
        },
    },
});

export default headerSlice.reducer;

export const { setSortBy, setSearchBy, setFilterBy } = headerSlice.actions;