const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username field shouldn't be blank"],
  },
  password: {
    type: String,
    required: [true, "Password field shouldn't be blank"],
  },
});

// FindAndValidate function
userSchema.statics.findAndValidate = async function (username, password) {
  const user = await this.findOne({ username });

  if (!user) return false;
  else {
    const result = await bcrypt.compare(password, user.password);
    return result ? user : false;
  }
};

// Password hashing before saving to dbs
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
