import { apiSlice } from './apiSlice';
import { AUTH_URL } from '../constants';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        body: data,
      }),
    }),

    signout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/signout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } =
  authApiSlice;
