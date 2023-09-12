import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";


const port = process.env.PORT || 4000; 

connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
