const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      validate(value) {
        const validGenders = ["male", "female", "other"];

        if (!validGenders.includes(value)) {
          throw new Error("Invalid gender value");
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    skills: {
      type: [String],
      default: [],
    },

    about: {
      type: String,
      default: "Hey there! I am using DevTinder.",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;