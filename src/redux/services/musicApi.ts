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
        })
  }),
});

export const { useGetTopChartQuery } = musicCoreApi;