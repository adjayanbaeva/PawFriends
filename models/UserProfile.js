const mongoose = require("mongoose");
const Schema = monoose.Schema;

const UserProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users-account",
  },
  handle: {
    type: String,
    required: true,
    unique: true,
    max: 40,
  },
  avatar: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  dogs: {
    type: [Schema.Types.ObjectId],
    ref: "dogs-profile",
  },
  friends: {
    type: Schema.Types.ObjectId.ObjectId,
    ref: "users-account",
    select: false,
  },
});

module.exports = UserProfile = mongoose.model(
  "users-profile",
  UserProfileSchema
);
