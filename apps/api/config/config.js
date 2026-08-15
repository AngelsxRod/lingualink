import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

if (isProd && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET es requerido en producción");
}
if (isProd && !process.env.MONGO_URI) {
  throw new Error("MONGO_URI es requerido en producción");
}

const config = {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URI || "mongodb://localhost:27017/basedata",
  jwtSecret: process.env.JWT_SECRET || "supersecretkey",
};

export default config;
