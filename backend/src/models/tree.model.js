const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workspaceId: { type: String, required: true },
  order: { type: Number, required: true },
});

const Tree = mongoose.model("tree", treeSchema);

module.exports = Tree;
