import { apiSlice } from './apiSlice';
import { AUTH_URL } from '../constants';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSigninMutation } = authApiSlice;
