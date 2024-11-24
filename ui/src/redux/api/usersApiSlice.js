import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

    getAllUsers: builder.query({
      query: () => USERS_URL,
    }),
  }),
});

export const { useProfileMutation, useGetAllUsersQuery } = userApiSlice;
