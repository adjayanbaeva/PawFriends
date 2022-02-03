const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  dog: [
    // type: [Schema.Types.ObjectId],
    // ref: "dogs-profile",
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
      },
      avatar: {
        type: String,
      },
      bio: {
        type: String,
      },
    },
  ],
  friends: {
    type: Schema.Types.ObjectId,
    ref: "users-account",
    select: false,
  },
});

module.exports = UserProfile = mongoose.model(
  "users-profile",
  UserProfileSchema
);
