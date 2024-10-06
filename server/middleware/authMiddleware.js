import jwt from "jsonwebtoken";
import Seekers from "../models/seekerModel.js";
import Recruiters from "../models/recruiterModel.js";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ error: "Authentication failed: Token missing or malformed" });
    }
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.accountType === "seeker") {
      user = await Seekers.findOne({ _id: decoded.userId });
    } else {
      user = await Recruiters.findOne({ _id: decoded.userId });
    }

    if (!user) {
      return res.status(401).json({
        error: "Authentication failed",
      });
    }
  
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Authentication failed: Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Authentication failed: Invalid token" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default userAuth;
