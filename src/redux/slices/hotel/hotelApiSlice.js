import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, baseUrlHotel } from '../../../../baseurl';
import getAuthToken from '../../../components/Common/getAuthToken';

const Url = `${baseUrlHotel}`;

// Token validation function
const tokenIsValid = (token) => {
  // Add real validation logic if needed
  return !!token;
};

export const hotelApiSlice = createApi({
  reducerPath: 'hotelApi',
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
    hotelActionPost: builder.mutation({
      query: ({ param, body }) => ({
        url: param,
        body: body,
        method: 'POST',
      }),
    }),

    dateChangeRequest: builder.mutation({
      query: (body) => ({
        url: 'agent-hotel/dateChangeRequest',
        body: body,
        method: 'POST',
      }),
    }),

    hotelActionPatch: builder.mutation({
      query: (params) => ({
        url: params,
        method: 'PATCH',
      }),
    }),

    hotelNameChangeRequest: builder.mutation({
      query: (body) => ({
        url: `agent-hotel/hotelNameChangeRequest`,
        method: 'POST',
        body: body,
      }),
    }),

    getChatData: builder.query({
      query: (param) => ({
        url: param,
        method: 'GET',
      }),
    }),

    startConversation: builder.mutation({
      query: (body) => ({
        url: `threads/startConversation`,
        body: body,
        method: 'POST',
      }),
    }),

    createMessageByAgent: builder.mutation({
      query: (param) => ({
        url: `threads/createMessageByAgent?${param}`,
        method: 'POST',
      }),
    }),

    actionHotel: builder.mutation({
      query: ({ param, body, method }) => ({
        url: param,
        body: body,
        method: method,
      }),
    }),

    seenMessageByAgentHotel: builder.mutation({
      query: (param) => ({
        url: `threads/seenMessageByAgent?${param}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['SeenMessages'],
    }),
    seenMessageByAgentFlight: builder.mutation({
      query: (param) => ({
        url: `${baseUrl}threads/seenMessageByAgent?${param}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['SeenMessages'],
    }),
  }),
});

export const {
  useHotelActionPostMutation,
  useDateChangeRequestMutation,
  useHotelActionPatchMutation,
  useHotelNameChangeRequestMutation,
  useGetChatDataQuery,
  useStartConversationMutation,
  useCreateMessageByAgentMutation,
  useActionHotelMutation,
  useSeenMessageByAgentHotelMutation,
  useSeenMessageByAgentFlightMutation,
} = hotelApiSlice;
