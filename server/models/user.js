import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "dotenv/config";
import validator from "validator";
import { USER, ADMIN } from "../constants/index.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[A-z][A-z0-9-_]{3,23}$/.test(value);
        },
        message:
          "username must be alphanumeric,without special characters.Hyphens and underscores allowed",
      },
    },

    password: {
      type: String,
      select: false,
      validate: [
        validator.isStrongPassword,
        "Password must be at least 8 characters long, with at least 1 uppercase and lowercase letters and at least 1 symbol",
      ],
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    avatar: String,

    role: {
      type: String,
      enum: [USER, ADMIN],
      default: USER,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },

    passwordChangedAt: Date,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.role.length === 0) {
    this.role.push(USER);
    next();
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

userSchema.methods.getForgotPasswordToken = function () {
  // generate a long and randomg string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  // getting a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  //time of token
  this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

  return forgotToken;
};

const User = mongoose.model("User", userSchema);

export default User;
