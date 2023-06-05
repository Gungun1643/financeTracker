const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
  lastName: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
  email: {
     type: String,
     require: true,
     trim: true,
     unique: true,
     lowercase: true,
  },
  hash_password: {
     type: String,
     require: true,
  },
  role: {
     type: String,
     enum: ["user", "admin"],
     default: "user",
  },
  contactNumber: {
     type: String,
  },
  profilePicture: {
     type: String,
  },
  income: {
     type: Number,
     require: true,
     trim: true,
  },
  expenditure: {
   type: Number,
   require: true,
   trim: true,
  },
  budget: {
   type: Number,
   require: true,
   trim: true,
  },
  provisionalBalance: {
   type: Number,
   require: true,
   trim: true,
  },
  remainingToSpend: {
   type: Number,
   require: true,
   trim: true,
  },
},{ timestamps: true });
//For get fullName from when we get data from database
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.method({
  async authenticate(password) {
     return bcrypt.compare(password, this.hash_password);
  },
});
module.exports = mongoose.model("User", userSchema);