import { apiSlice } from './apiSlice';

export const globalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSim: builder.query({
      query: ({ country, type, region, page, pageSize, simType, pakType }) => ({
        url: `/mobileDataSim/packages?type=${type}&countryCode=${country}&region=${region}`,
      }),
    }),

    sellDataSim: builder.mutation({
      query: (data) => {
        return {
          url: `/mobileDataSim/submitEsimOrder`,
          method: 'POST',
          body: data,
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        };
      },
    }),

    // getSimOne: builder.query({
    //   query: ({ id, aId }) => ({
    //     url: `/mobileDataSim/findOneDataSimSaleByAgent/${id}?agentId=${aId}`,
    //   }),
    // }),
  }),
});

export const { useGetSimQuery, useSellDataSimMutation, useGetSimOneQuery } =
  globalApi;
