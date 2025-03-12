import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

// files
import cors from './config/cors';
import apiStatus from './utils/apiStatus';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

// routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import genreRoutes from './routes/genreRoutes';
import movieRoutes from './routes/movieRoutes';
import uploadRoutes from './routes/uploadRoutes';

//configurations
const app = express();

// middlewares
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// handle base api url to show api status
app.get('/', apiStatus);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/upload', uploadRoutes);

const rootDir = path.resolve();
// configure express to serve static files from the  uploads directory
// this code is only for serving images
// without this, the image upload functionality will still work,
// but we won't be able to access the uploaded images via URLs
app.use('/uploads', express.static(path.join(rootDir + '/uploads')));

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