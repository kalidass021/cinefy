import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// files
import { cors, rateLimiter } from './config';
import { apiStatus } from './utils';
import { notFound, errorHandler } from './middlewares';
// routes
import {
  authRoutes,
  userRoutes,
  genreRoutes,
  movieRoutes,
  uploadRoutes,
} from './routes';
import { ROUTES } from './constants/appConstants';

//configurations
const app = express();

// middlewares
app.use(rateLimiter);
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// handle base api url to show api status
app.get('/', apiStatus);

// Routes
app.use(ROUTES.AUTH, authRoutes);
app.use(ROUTES.USERS, userRoutes);
app.use(ROUTES.GENRE, genreRoutes);
app.use(ROUTES.MOVIES, movieRoutes);
app.use(ROUTES.UPLOAD, uploadRoutes);

const rootDir = path.resolve();
// configure express to serve static files from the  uploads directory
// this code is only for serving images
// without this, the image upload functionality will still work,
// but we won't be able to access the uploaded images via URLs
app.use(ROUTES.STATIC_UPLOADS, express.static(path.join(rootDir + '/uploads')));

app.use(notFound); // handle undefined routes
app.use(errorHandler); // handle the errors

const startServer = () => {
  const port = parseInt(process.env.PORT, 10) || 5000;
  const server = app.listen(port, () => {
    const url =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${port}`
        : process.env.API_URL;
    console.info(`Server is up and listening at ${url}`);
  });

  return server;
};

export default startServer;
