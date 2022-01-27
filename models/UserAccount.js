const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const UserAccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// now we need to actually create the collection in mongoDb, so we are asking mongoose to create a model using UserAccountSchema and the actual name of the collection in db is users, but internal name is UserAccount
module.exports = UserAccount = mongoose.model(
  "users-account",
  UserAccountSchema
);
