import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config.js";
import { tagRoutes, userRoutes, questionRoutes, answerRoutes } from "#modules";

const app = express();
const port = config.port || 2656;
// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/tags", tagRoutes.router);
app.use("/user", userRoutes.router);
app.use("/question", questionRoutes.router);
app.use("/answer", answerRoutes.router);

export const initServer = () => {
  app.listen(port);
  console.log(`Server HTTP running in port ${port}`);
};
