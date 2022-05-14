import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IAlbum, IFetchParams } from '../models/types'

export interface IFetchAlbumsResponse {
    albums: IAlbum[]
    albumsAmount: number;
}

export const albumsAPI = createApi({
    reducerPath: 'albumsApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    endpoints: (build) => ({
        fetchAlbum: build.query<IAlbum, string>({
            query: (albumId) => ({
                url: `/albums/${albumId}`
            })
        }),
        fetchAlbums: build.query<IFetchAlbumsResponse, IFetchParams>({
            query: (params) => ({
                url: `/albums?offset=${params.offset}&query=${params.searchQuery}`
            })
        }),
        fetchArtistsAlbums: build.query<IAlbum[], string>({
            query: (artistId) => ({
                url: `/albums/artist/${artistId}`
            })
        }),
        addAlbum: build.mutation<IAlbum, FormData>({
            query: (albumData) => ({
                url: '/albums/',
                method: 'POST',
                body: albumData
            })
        }),
    })
})