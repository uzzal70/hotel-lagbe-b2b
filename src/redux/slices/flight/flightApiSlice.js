import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../../baseurl';
import getAuthToken from '../../../components/Common/getAuthToken';

const Url = `${baseUrl}/core`;

// Token validation function
const tokenIsValid = (token) => {
    // Add real validation logic if needed
    return !!token;
};

export const flightApiSlice = createApi({
    reducerPath: 'flightApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Url,
        prepareHeaders: (headers) => {
            const token = getAuthToken();
            if (token && tokenIsValid(token)) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({


        getData: builder.query({
            query: (param) => ({
                url: param,
                method: 'GET',
            }),
        }),

        actionFlight: builder.mutation({
            query: ({ param, body, method }) => ({
                url: param,
                body: body,
                method: method,
            }),
        }),


    }),
});

export const { useGetDataQuery, useActionFlightMutation } = flightApiSlice;
