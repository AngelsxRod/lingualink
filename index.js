import { initServer } from "./config/app.js";
import { connect } from "./config/db.js";

initServer();
connect();