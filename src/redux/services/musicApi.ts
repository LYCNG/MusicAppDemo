import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.VITE_MUSIC_API_KEY;

export type BasicParams = {
    related: string,
    limit:number
};
export const musicCoreApi = createApi({
    reducerPath: 'musicCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', apiKey);
            headers.set('X-RapidAPI-Host','shazam.p.rapidapi.com')
            return headers
    } }),
    endpoints: (builder) => ({
        getTopChart: builder.query({
            query: () => ({
                url: '/charts/track',
                params: {
                    locale: 'en-US',
                    pageSize: '20',
                    startFrom: '0'
                },
            })
        }),
        getSongDetail: builder.query({
            query: (songId:string) => ({
                url: 'shazam-songs/get-details',
                params: {
                    id: songId,
                    locale: 'en-US'
                }
            })
        }),
        getSongRelated: builder.query({
            query: ({ songId }) => ({
                url: 'shazam-songs/list-similarities',
                params: {
                    id: `track-similarities-id-${songId}`,
                    locale: 'en-US'
                }
            })
        })
  }),
});

export const { useGetTopChartQuery,useGetSongDetailQuery } = musicCoreApi;