import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getAuthToken from '../../components/Common/getAuthToken';
import { baseUrl, baseUrlHotel } from '../../../baseurl';
const Url = `${baseUrl}/core`;

const token = getAuthToken();
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Url,
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken();
      // For example, checking two times
      if (token && tokenIsValid(token)) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginItem: builder.mutation({
      query: (loginData) => ({
        url: 'auth/agentSignIn',
        method: 'POST',
        body: loginData,
      }),
    }),
    //Myprofile
    getItems: builder.query({
      query: (queryParams) => {
        return {
          url: queryParams.url,
          headers: queryParams.headers,
          // keepUnusedDataFor: 600,
        };
      },
    }),
    //Staff add + Update
    createItem: builder.mutation({
      query: (data) => {
        return {
          url: data.url,
          method: data.method,
          headers: data.headers,
          body: data.payload,
        };
      },
    }),
    //MyprofileUpdate
    editItem: builder.mutation({
      query: (updatedItem) => ({
        url: `${updatedItem?.url}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body: updatedItem,
      }),
    }),
    deleteItem: builder.mutation({
      query: (itemId) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: itemId,
        method: 'DELETE',
      }),
    }),
    patchItem: builder.mutation({
      query: (itemId) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: itemId,
        method: 'PATCH',
      }),
    }),
    getAllHotelThreads: builder.query({
      query: ({ agentId, page, pageSize, searchWord  }) => ({
        url: `${baseUrlHotel}/threads/agentGetAllHotelThreads?agentId=${agentId}&page=${page}&pageSize=${pageSize}&searchWord=${
          searchWord || ''
        }`,
        method: 'GET',
      }),
    }),
    getAllFlightThreads: builder.query({
      query: ({ agentId, page, pageSize, searchWord }) => ({
        url: `/threads/agentGetAllThreads?agentId=${agentId}&page=${page}&pageSize=${pageSize}&searchWord=${
          searchWord || ''
        }`,
        method: 'GET',
      }),
    }),
  }),
});
const tokenIsValid = (token) => {
  // Implement your token validation logic here
  // For example, check token expiration or any other criteria
  return true; // Replace with your validation logic
};

export const {
  useLoginItemMutation,
  useGetItemsQuery,
  useGetAllHotelThreadsQuery,
  useGetAllFlightThreadsQuery,
  useCreateItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  usePatchItemMutation,
} = apiSlice;
