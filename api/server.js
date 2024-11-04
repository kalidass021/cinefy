// packages
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';


// files
import connectDB from './config/connectDB.js';

//configurations
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const PORT = process.env.PORT || PORT;

// Routes


app.listen(PORT, () => {
    console.info(`Server is up and listening on port ${PORT}`);
    connectDB();
});