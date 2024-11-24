import { apiSlice } from './apiSlice';
import { GENRE_URL } from '../../config/constants';

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: 'POST',
        body: newGenre,
      }),
    }),

    updateGenre: builder.mutation({
      query: ({ id, updatedGenre }) => ({
        url: `${GENRE_URL}/${id}`,
        method: 'PUT',
        body: updatedGenre,
      }),
    }),

    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    fetchGenres: builder.query({
      query: () => `${GENRE_URL}/genres`,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} = genreApiSlice;
