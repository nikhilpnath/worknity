import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import mongoSanitize from "express-mongo-sanitize";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectToDB } from "./config/db.js";

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// secure header http
app.use(helmet());

//data sanitization middlewares
app.use(mongoSanitize());
app.use(xss());

//logging middleware
app.use(morgan("dev"));

//db connection
connectToDB();

app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
