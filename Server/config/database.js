import mongoose from "mongoose";

export const connectDB = async () => {
  const { connection } = await mongoose.connect("mongodb+srv://saurabh:ZdOER99mgBQxLPSo@cluster0.wy8es8z.mongodb.net/?retryWrites=true&w=majority");
  console.log(`Mongodb is connected with ${connection.host}`);
};
