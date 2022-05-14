import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'
import { IUser, IApiError } from '../models/types'
import { Mutex } from 'async-mutex'
import { userSlice } from '../store/reducers/userSlice'
import { RootState } from '../store/store'
const { removeUser, setAccessToken } = userSlice.actions

interface LoginData {
    email: string; 
    username?: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser
}

const token = localStorage.getItem('token')

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_SERVER_URL,  
    prepareHeaders: (headers, {getState}) => {
        const accessToken = (getState() as RootState).userReducer.accessToken
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers
    },
    credentials: "include"
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          '/refresh',
          api,
          { method: 'GET' }
        ) 
        const refreshData = refreshResult.data as AuthResponse
        if (refreshResult.data) {
            api.dispatch(setAccessToken(refreshData.accessToken))
            result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(removeUser())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}


export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, LoginData>({
            query: (loginData) => ({
                url: '/login',
                method: 'POST',
                body: loginData
            })
        }),
        logout: build.mutation<Object, string>({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        registration: build.mutation<AuthResponse, LoginData>({
            query: (loginData) => ({
                url: '/registration',
                method: 'POST',
                body: loginData
            })
        }),
        getUser: build.query<IUser | null, string>({
            queryFn: async (_, __, ___, baseQuery) => {
                if(token) {
                    try {
                        const response = await baseQuery('/user')
                        const data = response.data as IUser
                        return { data }
                    } catch (error) {
                        const e = error as IApiError
                        return {error: { status: e.data.status, data: e.data.message }}
                    }
                }
                return {data: null}
            }
        }),
        addSongToFavorites: build.mutation<Object, string>({
            query: (songId) => ({
                url: '/add-song-to-favorites',
                method: 'PUT',
                body: {songId},
            })
        }),
        removeSongFromFavorites: build.mutation<Object, string>({
            query: (songId) => ({
                url: '/remove-song-from-favorites',
                method: 'PUT',
                body: {songId},
            })
        }),
    })
})