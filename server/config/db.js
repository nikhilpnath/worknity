import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected SuccessFully");
  } catch (err) {
    console.log("DB Connection Failed : " + err);
  }
};
