import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config.js";
import {
  tagRoutes,
  userRoutes,
  questionRoutes,
  answerRoutes,
  permissionRoutes,
  roleRoutes,
  authRoutes,
} from "#modules";

import ServerlessHttp from "serverless-http";

const app = express();
const port = config.port || 2656;
// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/tags", tagRoutes.router);
app.use("/user", userRoutes.router);
app.use("/question", questionRoutes.router);
app.use("/answer", answerRoutes.router);
app.use("/permission", permissionRoutes.router);
app.use("/role", roleRoutes.router);
app.use("/auth", authRoutes.router);

export const initServer = () => {
  app.listen(port);
  console.log(`Server HTTP running in port ${port}`);
};

export const handler = ServerlessHttp(app);
