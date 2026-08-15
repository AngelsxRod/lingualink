import mongoose from "mongoose";
import config from "./config.js";
import initPermissions from "./scrips/initPermissions.js";

let cached = globalThis._mongooseConn;
if (!cached) {
  cached = globalThis._mongooseConn = {
    conn: null,
    promise: null,
    permissionsSeeded: false,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB | Error de conexión:", err);
    });
    mongoose.connection.on("connecting", () => {
      console.log("🔄 MongoDB | Intentando conectar...");
    });
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB | Conectado a la base de datos");
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB | Desconectado");
    });

    cached.promise = mongoose
      .connect(config.mongo_uri, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;

  if (!cached.permissionsSeeded) {
    cached.permissionsSeeded = true;
    await initPermissions();
  }

  return cached.conn;
};
