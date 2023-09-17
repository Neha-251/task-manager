const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  cardId: { type: Number, required: true },
  badges: { type: Array, required: false },
  members: { type: Array, required: false },
  treeId: { type: String, required: true },
  workspaceId: { type: String, required: true },
  actions: { type: Array, required: false },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
