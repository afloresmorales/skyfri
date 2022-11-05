// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiUrl } from '../config';
// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl,
    // mode: 'cors',
    // prepareHeaders: async (headers, { getState }) => {
    //   const token = (getState()).auth.token;
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   const ip = await getPublicIPAddress();
    //   if (token) {
    //     // headers.set('x-api-token', `Bearer ${token}`)
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }
    //   headers.set('x-ip-address', ip);
    //   console.log(headers);
    //   return headers;
    // },
  }),
//   tagTypes: ['Post', 'User'], // re-fetching for new updates
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    // getContent: builder.query({
    //   // The URL for the request is '/fakeApi/posts'
    //   query: (appId) => `/micro_apps/${appId}`
    // }),
    // getSeries: builder.query({
    //     query: ({seriesId, appId}) => {
    //       return {
    //         url: `/series/${seriesId}`,
    //         params: {appId},
    //       }
    //     }
    //   }),
    registerNewAgreement: builder.mutation({
    query: agreement => ({
        url: '/agreements',
        method: 'POST',
        // Include the entire post object as the body of the request
        body: agreement
    })
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useRegisterNewAgreementMutation } = apiSlice