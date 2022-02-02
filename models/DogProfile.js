const mongoose = require("mongoose");
const Schema = monoose.Schema;

const DogProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  age: {
    type: Number,
  },
  bio: {
    type: String,
  },
});

module.exports = DogProfile = mongoose.model("dogs-profile", DogProfileSchema);
