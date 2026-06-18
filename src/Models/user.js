const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// verify password method for user
userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// generate jwt token for user
userSchema.methods.generateJWT = function () {
  const user = this;
  const token = jwt.sign(
    { userId: user._id },
    "your_jwt_secret_key",
    { expiresIn: "1h" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;