const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      // required: true,
    },
    postalCode: {
      type: Number,
      // required: true,
    },
    desc: {
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
          default: "",
        },
        bio: {
          type: String,
        },
      },
    ],
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
