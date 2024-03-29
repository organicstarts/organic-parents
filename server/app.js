import bodyParser from "body-parser";
import express from "express";
import path from "path";
const app = express();
require("./db/mongoose");
const router = express.Router();
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/UserAPI/user");
const replyRoutes = require("./routes/ReplyAPI/reply");
const threadRoutes = require("./routes/ThreadAPI/thread");
const imageRoutes = require("./routes/ImageAPI/image");
const conversationRoutes = require("./routes/MessageApi/conversation");
const messageRoutes = require("./routes/MessageApi/message");
const staticFiles = express.static(path.join(__dirname, "../../client/build"));
require("./config/seed");
const corsOption = {
  credential: true
};
app.use(cors(corsOption));
app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(passport.initialize());
require("./config/passport");
app.use(staticFiles);
app.use(router);
app.use(userRoutes);
app.use(replyRoutes);
app.use(threadRoutes);
app.use(imageRoutes);
app.use(conversationRoutes);
app.use(messageRoutes);
// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

module.exports = app;
