const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String },
    password: { type: String },
    avatar: { type: String, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schema);

module.exports = User;
