import rateLimit from 'express-rate-limit';
import { CONFIG_ERROR } from '../constants';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per windowMS
  message: CONFIG_ERROR.RATE_LIMIT_ERROR,
});

export default rateLimiter;
