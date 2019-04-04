import bodyParser from "body-parser";
import express from "express";
import path from "path";
const app = express();
require("./db/mongoose");
const router = express.Router();
const userRoutes = require("./routes/UserAPI/user");
const postRoutes = require("./routes/PostAPI/post");
const staticFiles = express.static(path.join(__dirname, "../../client/build"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(staticFiles);
app.use(router);
app.use(userRoutes);
app.use(postRoutes);
// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

module.exports = app;
