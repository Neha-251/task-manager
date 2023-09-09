const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userController = require("./src/controllers/user.controller");
const treeController = require("./src/controllers/tree.controller");
const cardController = require("./src/controllers/card.controller");
const workspaceController = require("./src/controllers/workspace.controller");
const badgeController = require("./src/controllers/badge.controller");

app.use("/users", userController);
app.use("/trees", treeController);
app.use("/cards", cardController);
app.use("/workspaces", workspaceController);
app.use("/badges", badgeController);

module.exports = app;
