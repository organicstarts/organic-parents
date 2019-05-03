import bodyParser from "body-parser";
import express from "express";
import path from "path";
const app = express();
require("./db/mongoose");
const router = express.Router();
const userRoutes = require("./routes/UserAPI/user");
const replyRoutes = require("./routes/ReplyAPI/reply");
const threadRoutes = require("./routes/threadAPI/thread");
const imageRoutes = require("./routes/imageAPI/image");
const staticFiles = express.static(path.join(__dirname, "../../client/build"));
require("./config/seed");
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(staticFiles);
app.use(router);
app.use(userRoutes);
app.use(replyRoutes);
app.use(threadRoutes);
app.use(imageRoutes);
// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

module.exports = app;
