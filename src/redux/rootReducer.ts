import { combineReducers } from 'redux';
import headerSlice from './slices/headerSlice';
import movieSlice from './slices/movieSlice';
import type { Action } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({
    headerStore: headerSlice,
    movieStore: movieSlice,
    // ... all your app's reducers
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: RootState | undefined, action: Action) => {
    // if (action.type === 'RESET') {
    //   state = undefined;
    // }
    return combinedReducer(state, action);
};

export default rootReducer;