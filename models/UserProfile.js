const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
  {
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
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
      max: 5,
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
          default: "",
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
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = UserProfile = mongoose.model(
  "users-profile",
  UserProfileSchema
);
