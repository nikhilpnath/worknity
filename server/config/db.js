import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected SuccessFully");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
};
