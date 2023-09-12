
import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModels.js";

let donationAmount;

export const checkout = async (req, res) => {
  try {
    const options = {
     amount: Number(req.body.donationAmount * 100), 
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    donationAmount = options.amount;
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      error: "Error during checkout",
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Save payment details to the database
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.redirect(
        `https://650026105cf4cf496b1833b3--jolly-pudding-c04731.netlify.app/paymentsuccess?reference=${razorpay_payment_id}&donationAmount=${donationAmount}`
      );
    } else {
      res.status(400).json({
        success: false,
        error: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({
      success: false,
      error: "Error during payment verification",
    });
  }
};
