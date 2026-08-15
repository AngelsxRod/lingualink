import { initServer } from "./config/app.js";
import { connectToDatabase } from "./config/db.js";

initServer();
connectToDatabase();