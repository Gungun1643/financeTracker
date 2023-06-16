const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { collection } = require("./auth");
const goalSchema = new mongoose.Schema(
  {
    personId: {
      type: String,
      require: true,
      trim: true,
    },
    months: {
      type: Number,
      require: true,
      trim: true,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    value: {
      type: Number,
      require: true,
      trim: true,
    }}
);

module.exports = mongoose.model("Goal", goalSchema);
