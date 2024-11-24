const APP_ENV = import.meta.env.VITE_APP_ENV;
const BASE_API_URL =
  APP_ENV === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;
export const BASE_URL = BASE_API_URL;
export const AUTH_URL = `${BASE_URL}/api/v1/auth`;
export const USERS_URL = `${BASE_URL}/api/v1/users`;
export const GENRE_URL = `${BASE_URL}/api/v1/genre`;
export const MOVIE_URL = `${BASE_URL}/api/v1/movies`;
export const UPLOAD_URL = `${BASE_URL}/api/v1/upload`;

// dynamic image url to render the image
export const IMAGE_BASE_URL =
  APP_ENV === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

