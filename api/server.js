// packages
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// routes
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import genreRoutes from './src/routes/genreRoutes.js';
import movieRoutes from './src/routes/movieRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';

//configurations
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

// handle base api url to show api status
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

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

// middleware to handle undefined routes
app.use((req, res) => {
  res.status(404).json({error: 'Not found'});
});

export default app;
