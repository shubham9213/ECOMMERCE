import order from "../models/order.js";
import product from "../models/product.js";
import user from "../models/user.js";

const getanalytics=async(req,resp)=>{
    try{
        const getorder=await order.countDocuments({})
        const getproduct=await product.countDocuments({})
        const getuser=await user.countDocuments({role:"user"});
        
        const Order=await order.find({});
        console.log(Order)
        const totalprice=Order.reduce((acc,curr)=>acc+curr.totalprice,0)
        console.log(totalprice)


        resp.status(200).json({order:getorder,product:getproduct,user:getuser,totalprice});
    }catch(err){
        resp.status(500).json({message:"server error"})
    }
}
export default getanalytics ;