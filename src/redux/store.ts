import { configureStore } from "@reduxjs/toolkit";

import type { PreloadedStateShapeFromReducersMapObject } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer";

// Used for testing
export const setupStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

// Used for actual global state
const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']; 