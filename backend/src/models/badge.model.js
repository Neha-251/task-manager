const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const Badge = mongoose.model("badge", badgeSchema);

module.exports = Badge;
