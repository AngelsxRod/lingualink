import mongoose from "mongoose";
import config from "./config.js";

export const connect = async () => {
  try {
    //Proceso de conexión
    mongoose.connection.on("error", () => {
      console.log("MongoDB | could not be connect to mongodb");
      mongoose.disconnect();
    });
    mongoose.connection.on("connecting", () => {
      console.log("MongoDB | try connecting");
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB | connected to mongodb");
    });
    mongoose.connection.once("open", () => {
      console.log("MongoDB | connected to database");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB | reconected to mongodb");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB | disconnected");
    });
    await mongoose.connect(config.mongo_uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
    });
  } catch (err) {
    console.error("Database connection failed", err);
  }
};
