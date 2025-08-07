import { apiSlice } from './apiSlice';
import { MOVIE_URL, UPLOAD_URL } from '../../constants';

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}`,
    }),

    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}`,
        method: 'POST',
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIE_URL}/${id}`,
        method: 'PUT',
        body: updatedMovie,
      }),
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/${id}`,
    }),

    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/new`,
    }),

    getTopRatedMovies: builder.query({
      query: () => `${MOVIE_URL}/top-rated`,
    }),

    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random`,
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/review`,
        method: 'POST',
        body: { rating, comment },
      }),
    }),

    deleteReview: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/${movieId}/review`,
        method: 'DELETE',
        body: { reviewId },
      }),
    }),

    uploadImage: builder.mutation({
      query: (FormData) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: FormData,
      }),
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
  useGetNewMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetRandomMoviesQuery,
  useAddMovieReviewMutation,
  useDeleteReviewMutation,
  useUploadImageMutation,
} = movieApiSlice;
