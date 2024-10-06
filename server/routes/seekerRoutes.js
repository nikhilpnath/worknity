import express from "express";
import {
  getUser,
  seekerLogin,
  seekerRegister,
  updateUser,
  applyJob,
  deleteUser,
  getUserById,
} from "../controller/seekerController.js";

import { limiter } from "../middleware/rateLimiterMiddleware.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", limiter, seekerRegister);
router.post("/login", limiter, seekerLogin);

// GET user
router.get("/get-user", userAuth, getUser);

//GET user by Id
router.get("/get-user-profile/:id", userAuth, getUserById);

// update user
router.put("/update-user", userAuth, updateUser);

//Apply Job
router.post("/apply-job/:jobId", userAuth, applyJob);

//Delete User
router.delete("/delete-user", userAuth, deleteUser);

export default router;
