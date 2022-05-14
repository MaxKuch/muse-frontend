import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAudio, IFetchParams } from '../models/types'

export interface IFetchSongsParams extends IFetchParams{
    sortByListens?: boolean;
    sortByDate?: boolean;
    limit?: number;
}

export interface IFetchSongsResponse {
    songs: IAudio[]; 
    songsAmount: number;
}

interface IFetchArtistsSongsParams extends IFetchSongsParams {
    artistId: string;
}


export const songsAPI = createApi({
    reducerPath: 'songsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_URL
    }),
    endpoints: (build) => ({
        fetchSongs: build.query<IFetchSongsResponse, IFetchSongsParams>({
            query: ({offset, searchQuery, sortByListens = false, sortByDate = false}) => ({
                url: `/songs?offset=${offset}&query=${searchQuery}&sortByListens=${sortByListens}&sortByDate=${sortByDate}`
            })
        }),
        fetchArtistsSongs: build.query<IAudio[], IFetchArtistsSongsParams>({
            query: ({artistId, limit, sortByListens = false}) => ({
                url: `/songs/artist/${artistId}?limit=${limit}&sortByListens=${sortByListens}`
            })
        }),
        fetchAlbumsSongs: build.query<IAudio[], string>({
            query: (albumId) => ({
                url: `/songs/album/${albumId}`
            })
        }),
        addSong: build.mutation<IAudio, FormData>({
            query: (songData) => ({
                url: '/songs',
                method: 'POST',
                body: songData
            })
        }),
        incrementListens: build.mutation<Object, string>({
            query: (songId) => ({
                url: '/increment-listens',
                method: 'PUT',
                body: {songId}
            })
        }),
    })
})