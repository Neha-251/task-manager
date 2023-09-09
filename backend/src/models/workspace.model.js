const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  members: { type: Array, required: true },
  description: { type: String, required: true },
});

const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = Workspace;
