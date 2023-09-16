import express  from "express";
import { config } from "dotenv";
import router from "./routes/router.js"
import cors from "cors";

config({path : "./config/config.env"});

 export const app = express();
 const allowedOrigins = ['https://65056128e988626b1ce70e0a--remarkable-raindrop-8b5162.netlify.app'];

 app.use(
   cors({
     origin: function (origin, callback) {
       if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
       } else {
         callback(new Error('Not allowed by CORS'));
       }
     },
   })
 );
 
  app.use(express.json());
  app.use(express.urlencoded({extended :true}));

 app.use("/api" , router);


 
app.get("/api/getkey", (req, res) =>
res.status(200).json({ key: process.env.RAZORPAY_API_KEY})
);
