import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../../baseurl';
import getAuthToken from '../../../components/Common/getAuthToken';

const Url = `${baseUrl}/core`;

// Token validation function
const tokenIsValid = (token) => {
    // Add real validation logic if needed
    return !!token;
};

export const chatApiSlice = createApi({
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
    tagTypes: ['ChatThread', 'SeenMessages'],
    endpoints: (builder) => ({

        getChatData: builder.query({
            query: (param) => ({
                url: param,
                method: 'GET',
            }),
            providesTags: ['ChatThread'],
        }),

        startConversation: builder.mutation({
            query: (body) => ({
                url: `threads/startConversation`,
                body: body,
                method: 'POST',
            }),
            providesTags: ['ChatThread'],
        }),

        createMessageByAgent: builder.mutation({
            query: (param) => ({
                url: `threads/createMessageByAgent?${param}`,
                method: 'POST',
            }),
            providesTags: ['ChatThread'],
        }),

        seenMessageByAgent: builder.mutation({
            query: (param) => ({
                url: `threads/seenMessageByAgent?${param}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SeenMessages'],
        }),



    }),
});

export const { useGetChatDataQuery, useStartConversationMutation, useCreateMessageByAgentMutation, useSeenMessageByAgentMutation } = chatApiSlice;
