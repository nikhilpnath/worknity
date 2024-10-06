import mongoose from "mongoose";
import { hashPassword } from "../utils/auth.js";
import { findByCredentials } from "../utils/user.js";

let seekerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    accountType: {
      type: String,
      default: "seeker",
    },
    contact: { type: String },
    location: { type: String },
    profileUrl: { type: String },
    resumeUrl: { type: String },
    headLine: { type: String },
    about: { type: String },
  },
  { timestamps: true }
);

//password hashing
seekerSchema.pre("save", hashPassword);

seekerSchema.statics.findByCredentials = async function (email, password) {
  return findByCredentials(this, email, password);
};

const Seekers = mongoose.model("Seekers", seekerSchema);

export default Seekers;
