import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongo_uri: process.env.MONGO_URI || "mongodb://localhost:27017/basedata",
  jwtSecret: process.env.JWT_SECRET || "supersecretkey",
};

export default config;
