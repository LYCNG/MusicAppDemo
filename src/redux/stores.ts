import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { musicCoreApi } from './services/musicApi';

export const store = configureStore({
    reducer: {
        [musicCoreApi.reducerPath]:musicCoreApi.reducer,
        player: playerReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(musicCoreApi.middleware)
});

export type StoreState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

