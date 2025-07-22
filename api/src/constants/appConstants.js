const OBJECT_ID_PATTERN = '([0-9a-fA-F]{24})'; // mongo db object id regex pattern

export const STATUS_CODES = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,
  ResetContent: 205,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  InternalServerError: 500,
  ServiceUnavailable: 503,
  HTTPVersionNotSupported: 505,
};

export const ROUTES = {
  AUTH: '/api/v1/auth',
  USERS: '/api/v1/users',
  GENRE: '/api/v1/genre',
  MOVIES: '/api/v1/movies',
  UPLOAD: '/api/v1/upload',
  STATIC_UPLOADS: '/uploads',
};

export const AUTH_ENDPOINTS = {
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
};

export const GENRE_ENDPOINTS = {
  FETCH_GENRES: '/genres',
  READ_GENRE: `:id`,
  CREATE_GENRE: '/',
  UPDATE_GENRE: `:id`,
  REMOVE_GENRE: `:id`,
};

export const MOVIE_ENDPOINTS = {
  GET_ALL_MOVIES: '/',
  GET_SPECIFIC_MOVIE: `/:id${OBJECT_ID_PATTERN}`,
  GET_NEW_MOVIES: '/new',
  GET_TOP_RATED_MOVIES: '/top-rated',
  GET_RANDOM_MOVIES: '/random',
  ADD_MOVIE_REVIEW: `/:id/review`,
  CREATE_MOVIE: '/',
  UPDATE_MOVIE: `/:id${OBJECT_ID_PATTERN}`,
  DELETE_MOVIE: `/:id${OBJECT_ID_PATTERN}`,
  DELETE_REVIEW: `/:id${OBJECT_ID_PATTERN}/review`
}
