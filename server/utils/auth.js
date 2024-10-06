import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateAuthToken = (id, accountType) => {
  const token = jwt.sign({ userId: id, accountType }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const hashPassword = async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
  }
  next();
};
