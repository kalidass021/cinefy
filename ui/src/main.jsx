import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore.js';
import './index.css';
import App from './App.jsx';

// auth
import { Signup, Signin, PrivateRoute } from './pages/Auth';

// restricted
import { Profile } from './pages/User';

// admin
import {
  AdminRoute,
  GenreList,
  CreateMovie,
  AdminMoviesList,
  UpdateMovie,
  AllReviews,
  AdminDashboard,
} from './pages/Admin';

// movies
import { AllMovies, MovieDetails } from './pages/Movies';

import Home from './pages/Home.jsx';
import { ErrorDisplay } from './components';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/signin',
        element: <Signin />,
      },
      {
        path: '/movies',
        element: <AllMovies />,
      },
      {
        path: '/movies/:id',
        element: <MovieDetails />,
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: '',
        element: <AdminRoute />,
        children: [
          {
            path: '/admin/movies/genre',
            element: <GenreList />,
          },
          {
            path: '/admin/movies/create',
            element: <CreateMovie />,
          },
          {
            path: '/admin/movies/list',
            element: <AdminMoviesList />,
          },
          {
            path: '/admin/movies/update/:id',
            element: <UpdateMovie />,
          },
          {
            path: '/admin/movies/dashboard',
            element: <AdminDashboard />,
          },
          {
            path: '/admin/movies/reviews',
            element: <AllReviews />,
          },
        ],
      },
    ],
    errorElement: <ErrorDisplay />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
