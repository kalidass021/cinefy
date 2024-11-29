// packages
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// files
import dbConnect from './src/config/dbConnect.js';

// routes
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import genreRoutes from './src/routes/genreRoutes.js';
import movieRoutes from './src/routes/movieRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';

//configurations
dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://cinefy-v1.vercel.app'], // Allow both dev and prod origins
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// middleware to handle the errors
app.use((err, req, res, next) => {
  err.stack && console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const serverSetup = () => {
  const port = process.env.PORT || 5000;
  // use localhost in development and all interfaces in production
  const hostname = process.env.NODE_ENV === 'development' ? '127.0.0.1' : '0.0.0.0';

  const server = app.listen(port, hostname, () => {
    // get the address information
    const address = server.address();
    const host = process.env.NODE_ENV === 'development' ? 'localhost' : address.address;
    const url = `http://${host}:${port}`;
    console.info(`Server is up and listening at ${url}`);
  });
  // connect to db
  dbConnect();

  return server;
};

export default serverSetup;
