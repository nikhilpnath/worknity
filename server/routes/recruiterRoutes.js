import express from "express";
import {
  recruiterLogin,
  recruiterRegister,
  getCompanies,
  getCompanyById,
  getCompanyJobListing,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controller/recruiterController.js";

import userAuth from "../middleware/authMiddleware.js";
import { limiter } from "../middleware/rateLimiterMiddleware.js";

const router = express.Router();

router.post("/register", limiter, recruiterRegister);
router.post("/login", limiter, recruiterLogin);

// get details
router.get("/get-company-profile", userAuth, getCompanyProfile);
router.get("/get-company-joblisting", userAuth, getCompanyJobListing);
router.get("/", getCompanies);
router.get("/get-company/:id", userAuth, getCompanyById);

// update data
router.put("/update-company", userAuth, updateCompanyProfile);

export default router;
