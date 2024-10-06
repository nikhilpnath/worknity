import bcrypt from "bcrypt";

export const findByCredentials = async (Model, email, password) => {
  const user = await Model.findOne({ email });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPassMatch = await bcrypt.compare(password, user.password);
  if (!isPassMatch) {
    throw new Error("Invalid Credentials");
  }

  return user;
};
