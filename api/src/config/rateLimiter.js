import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 10, // limit each IP to 100 requests per windowMS
    message: 'Too many requests from this IP, please try again later',
});

export default rateLimiter;