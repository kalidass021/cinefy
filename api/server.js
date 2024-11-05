// packages
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';


// files
import connectDB from './src/config/connectDB.js';

//configurations
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const PORT = process.env.PORT || PORT;

// Routes


// middleware to handle the errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.info(`Server is up and listening on port ${PORT}`);
    connectDB();
});