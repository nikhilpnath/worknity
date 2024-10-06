import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, //3 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: "Too many request from this IP,please try again after 3 minutes",
});
