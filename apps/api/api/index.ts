import type { IncomingMessage, ServerResponse } from "http";
import app from "../config/app.js";
import { connectToDatabase } from "../config/db.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await connectToDatabase();
  return app(req, res);
}
