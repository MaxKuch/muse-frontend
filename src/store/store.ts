import { combineReducers, configureStore } from "@reduxjs/toolkit";
import songsQueueReducer from './reducers/songsQueueSlice'
import userReducer from './reducers/userSlice'
import { songsAPI } from '../services/songsService'
import { artistsAPI } from '../services/artistsService'
import { albumsAPI } from '../services/albumsService'
import { authAPI } from '../services/authService'

const rootReducer = combineReducers({
    songsQueueReducer,
    userReducer,
    [songsAPI.reducerPath]: songsAPI.reducer,
    [artistsAPI.reducerPath]: artistsAPI.reducer,
    [albumsAPI.reducerPath]: albumsAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware()
            .concat(songsAPI.middleware)
            .concat(artistsAPI.middleware)
            .concat(albumsAPI.middleware)
            .concat(authAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
