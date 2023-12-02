import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

//Routes
import apiRoute from "@/routes/api";

const app = express();

app.use(
  helmet({
    hidePoweredBy: true,
  })
);
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoute);

app.use("*", (_req, res) => {
  res.status(401).end();
});

const PORT = process.env.PORT ?? 80;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
