import order from "../models/order.js";
import sendEmail from "../utils/sendemail.js"

const createorder=async(req,resp)=>{
    try{
        const {paymentid,product,address,totalprice} = req.body;

        if(!paymentid || !product || !address || !totalprice){
            return resp.status(400).json({message:"All fields are required"});
        }

        const data=new order({user:req.user._id,paymentid,product,address,totalprice})
        await data.save();

        await sendEmail(req.user.email,"subjevt h","CONGRAUTOON YOUR ORDER IS ACCEPETD THANKYOU TO VISIT MY WEBSITE ")
        
        resp.status(200).json({message:"order created successfully"});


    }catch(err){resp.status(400).json({message:"server error"})
}
}

const getallorder=async(req,resp)=>{
    try{ console.log("GETALLORDER CONTROLLER CALLED");

        const allorder=await order.find({}).populate("user");
                console.log(allorder);
        // .populate("user").populate("product.productid");


        if(!allorder){
            return resp.status(400).json({message:"no order found"});
        }
        return resp.json(allorder)

    }catch(err){resp.status(404).json({message:"server error"})
}
}

const myorder=async(req,resp)=>{
    try{console.log("GETALLORDER CONTROLLER CALLED");

        const myorder=await order.find({user:req.user._id})
        console.log(myorder)
        // .populate("user").populate("product.productid");
        if(!myorder){
            return resp.status(400).json({message:"no order found"});
        }
        return resp.json(myorder)
    }catch(err){resp.status(400).json({message:"server error"})}
}
const updatestatus=async(req,resp)=>{
    try{    
        const {status}=req.body;
        const Order=await order.findById(req.body.id);
        if(!Order){
            return resp.status(400).json({message:"no order found"});
        }
        Order.status=status;
        await Order.save();
        resp.json({message:"status updated"})

    }catch(err){resp.status(400).json({message:"server error"})}
}
export {createorder,getallorder,myorder,updatestatus};