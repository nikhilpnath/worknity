import express from "express";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/checkToken", userAuth, (req, res) => {
  res.status(200).json({ success: true, message: "Token is valid" });
});

export default router;
