import mongoose from "mongoose";
const orderschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    product:[{
        qty:{type:Number,required:true},
        productid:{type:mongoose.Schema.Types.ObjectId,
            ref:"product"

        },
        price:{
            type:Number,
            required:true}
    }],
    totalprice:{
        type:Number,
        required:true
    },

    paymentid:{
        type:String
    },
    address:{
        name:{
            type:String
          
        },
        pincode:{type:String},
        state:{
            type:String
            
        },
        city:{
            type:String
            
        }
    },
    status:{
            type:String,
            enum:["pending","shipped","delivered"],
            default:'pending'
        }


})
export default mongoose.model("order",orderschema);