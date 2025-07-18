import { STATUS_CODES } from "../constants/appConstants";

const apiStatus = (req, res) => {
    res.status(200).json({
        statusCode: STATUS_CODES.OK,
        message: 'API is working!',
        environment: process.env.NODE_ENV,
    })
};

export default apiStatus;