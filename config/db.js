import mongoose from "mongoose";
import config from "./config.js";
import initPermissions from "./scrips/initPermissions.js";

export const connect = async () => {
  try {
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB | Error de conexión:", err);
    });
    mongoose.connection.on("connecting", () => {
      console.log("🔄 MongoDB | Intentando conectar...");
    });
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB | Conectado a la base de datos");
    });
    mongoose.connection.once("open", async () => {
      console.log("📡 MongoDB | Conexión establecida");
      await initPermissions(); // ✅ Se ejecuta después de abrir la conexión
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB | Desconectado");
    });

    // Conectar a MongoDB con `await`
    await mongoose.connect(config.mongo_uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
    });

    console.log("✅ Database connection successful");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
};