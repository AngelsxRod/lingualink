import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
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
  resourceRoutes,
} from "#modules";

const app: Express = express();
const port = config.port || 2656;
// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  }),
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
app.use("/resource", resourceRoutes.router);
app.use("/test", (req: Request, res: Response) => {
  res.json({
    message: "Esta funcion es para pruebas",
  });
});

export const initServer = () => {
  app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
};

export default app;
