export interface AppConfig {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  corsOrigins: string[];
  nodeEnv: string;
  isProd: boolean;
}

export interface ConfigShape {
  app: AppConfig;
}

export default (): ConfigShape => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const isProd = nodeEnv === "production";

  if (isProd && !process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET es requerido en producción");
  }
  if (isProd && !process.env.MONGO_URI) {
    throw new Error("MONGO_URI es requerido en producción");
  }

  const corsOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    app: {
      port: Number(process.env.PORT) || 3000,
      mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/basedata",
      jwtSecret: process.env.JWT_SECRET || "supersecretkey",
      corsOrigins,
      nodeEnv,
      isProd,
    },
  };
};
