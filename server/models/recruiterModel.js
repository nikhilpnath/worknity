import mongoose from "mongoose";
import { hashPassword } from "../utils/auth.js";
import { findByCredentials } from "../utils/user.js";

let recruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
      default: "company",
    },
    contact: { type: String },
    location: { type: String },
    about: { type: String },
    profileUrl: { type: String },
    jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { timestamps: true }
);

//password hashing
recruiterSchema.pre("save", hashPassword);

recruiterSchema.statics.findByCredentials = async function (email, password) {
  return findByCredentials(this, email, password);
};

const Recruiters = mongoose.model("Recruiters", recruiterSchema);

export default Recruiters;
