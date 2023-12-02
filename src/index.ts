import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";

//Routes
import apiRoute from "@/routes/api";
import { validateUser } from "@/middlewares/validateUser";

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoute);
app.get("/user", validateUser, (req, res) => {
  console.log(req.context);

  res.json({ ok: "your in bro ;) " });
});

app.use("*", (_req, res) => {
  res.status(401).end();
});

app.listen(80, () => {
  console.log(`Listening on http://localhost:80`);
});
