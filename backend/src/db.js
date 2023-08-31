const mongoose = require("mongoose");

const uri = "mongodb+srv://nehasen:nehasen@cluster0.rvxcrpl.mongodb.net/";

const Connect = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = Connect;
