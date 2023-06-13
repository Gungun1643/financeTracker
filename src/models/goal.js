const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { collection } = require("./auth");
const goalSchema = new mongoose.Schema(
  {
    goalType: {
      type: String,
      require: true,
      trim: true,
    },
    goalName: {
      type: String,
      require: true,
      trim: true,
    },
    goalValue: {
      type: Number,
      require: true,
      trim: true,
    }}
);

module.exports = mongoose.model("Goal", goalSchema);
