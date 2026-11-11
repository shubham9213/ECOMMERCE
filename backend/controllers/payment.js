import razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
const createorder=async(req,resp)=>
{
 try{

const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});

const options={
 amount:req.body.amount*100,
 currency:"INR",
 receipt:crypto.randomBytes(10).toString("hex")  
}

const order=await razorpayInstance.orders.create(options);
if(!order){
    return resp.status(500).json({message:"some error occurred"})
}
resp.status(200).json({message:"Order created", order});
}catch (err){
    resp.status(300).json({message:"server error"})
    }
}

const verify = async (req, resp) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return resp.status(200).json({ message: "payment verify succesfully" })
        } else {
            return resp.status(400).json({ error: "invalid payment not succesfully" })
        }
    }
    
    catch (err){
    resp.status(300).json({message:"server error"})
}
    
}
export {createorder, verify};


