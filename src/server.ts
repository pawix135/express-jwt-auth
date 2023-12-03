import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

//Routes
import apiRoute from "@/routes/api";
import logger from "./middlewares/logger";

// Initiate express server
const app = express();

// Requests logger
app.use(logger);

// Security and cors
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
/**
 * Code blocks are great for examples
 *
 * ```ts
 * // run typedoc --help for a list of supported languages
 * const instance = new MyClass();
 * ```
 */
// Cookies, body and url parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply routes
app.use("/api", apiRoute);

// Handle not implemented routes
app.use("*", (_req, res) => {
  res.status(404).end();
});

// Start server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
