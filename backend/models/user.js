import mongoose from "mongoose"

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    verify:{
        type:Boolean,
      default:false
    },
    createdat:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model("user",userschema);
