import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IArtist, IFetchParams } from '../models/types'

export interface IFetchArtistsResponse {
    artists: IArtist[]
    artistsAmount: number;
}

export const artistsAPI = createApi({
    reducerPath: 'artistsApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    endpoints: (build) => ({
        fetchArtists: build.query<IFetchArtistsResponse, IFetchParams>({
            query: (params) => ({
                url: `/artists?query=${params.searchQuery}&offset=${params.offset}`
            })
        }),
        fetchArtist: build.query<IArtist, string>({
            query: (artistId) => ({
                url: `/artists/${artistId}`
            })
        }),
        addArtist: build.mutation<IArtist, FormData>({
            query: (artistData) => ({
                url: `/artists`,
                method: 'POST',
                body: artistData,
                
            })
        }),
    })
})