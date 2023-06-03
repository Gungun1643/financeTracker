const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { collection } = require("./auth");
const expenseSchema = new mongoose.Schema(
  {
    personId: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    amount: {
      type: Number,
      require: true,
      trim: true,
    },
    createdAt: {
        type: Date,
        require: true,
        trim: true,
    },
    category: {
        type: String,
        require: true,
        trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
