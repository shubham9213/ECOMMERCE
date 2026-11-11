import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/user.js";
import productRouter from "./router/product.js"
import orderrouter from "./router/order.js";
import paymentRouter from "./router/payment.js";
import analyticsRouter from "./router/analytics.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"*",
    method:["GET","POST","PUT","DELETE"],
    allowHeaders:["Content-Type","Authorization"]
}));

app.use("/api/user", userRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderrouter);
app.use("/api/payment",paymentRouter);
app.use("/api/analytics",analyticsRouter)



async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    } catch (error) {
        
        console.log("MongoDB error:", error.message);
    }
}

main();

app.listen(8000, () => {
    console.log("App started on port 8000");
});