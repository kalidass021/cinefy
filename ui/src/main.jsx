import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore.js';
import './index.css';
import App from './App.jsx';

// auth
import Signup from './pages/Auth/Signup.jsx';
import Signin from './pages/Auth/Signin.jsx';

// restricted
import PrivateRoute from './pages/Auth/PrivateRoute.jsx';
import Profile from './pages/User/Profile.jsx';

// admin
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import GenreList from './pages/Admin/GenreList.jsx';
import CreateMovie from './pages/Admin/CreateMovie.jsx';
import AdminMoviesList from './pages/Admin/AdminMoviesList.jsx';
import UpdateMovie from './pages/Admin/UpdateMovie.jsx';

import Home from './pages/Home.jsx';
import ErrorDisplay from './components/ErrorDisplay.jsx';
import AllMovies from './pages/Movies/AllMovies.jsx';
import MovieDetails from './pages/Movies/MovieDetails.jsx';

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
