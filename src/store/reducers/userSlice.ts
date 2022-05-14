import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAudio, IUser } from '../../models/types'

interface IUserState {
    user: IUser | null;
    favoriteSongs: IAudio[];
    isAuth: boolean;
    accessToken: string | null;
}

const initialState: IUserState = {
    user: null,
    favoriteSongs: [],
    isAuth: false,
    accessToken: localStorage.getItem('token')
}

export const userSlice = createSlice({
    name: 'userSlice', 
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{user: IUser, accessToken?: string}>) {
            state.user = action.payload.user
            state.isAuth = true
            state.favoriteSongs = action.payload.user.favoriteSongs ?? []
            const accessToken = action.payload.accessToken
            if(accessToken) {
                localStorage.setItem('token', accessToken)
                state.accessToken = accessToken
            }
        },
        setAccessToken(state, action: PayloadAction<string>) {
            localStorage.setItem('token', action.payload)
            state.accessToken = action.payload
        },
        removeUser(state) {
            state.user = null
            state.favoriteSongs = []
            state.isAuth = false
            state.accessToken = null
        },
        setFavoriteSongs(state, action: PayloadAction<IAudio[]>) {
            if(state.isAuth) state.favoriteSongs = action.payload
        },
        addSongToFavorites(state, action: PayloadAction<IAudio>) {
            if(state.isAuth) state.favoriteSongs.push(action.payload)
        },
        removeSongFromFavorites(state, action: PayloadAction<string>) {
            if(state.isAuth) state.favoriteSongs = state.favoriteSongs.filter((audio) => audio._id !== action.payload)
        }
    }
})

export default userSlice.reducer