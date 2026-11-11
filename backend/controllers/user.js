import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendemail.js"

const tokengenerate = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "20d" })

}
const register = async (req, resp) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return resp.status(400).json({ message: "Please provide all required fields" });
        }
        
   
       
        const existingUser = await user.findOne({ email: email });

        if (existingUser) {
            return resp.status(400).json({ message: "User already exists" });
        }
         
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            name: name.trim(),
            email: email,
            password: hashpassword,
        
        });
        await newUser.save();

        const otp = Math.floor(Math.random() * 90000) + 100000;

        await sendEmail(email, `welcome to our website SHOPCART`, `welcome to our website SHOPCART Your OTP is ${otp}`);

        return resp.status(201).json({
            name: newUser.name,
            email: newUser.email,
            _id: newUser._id,
            role: newUser.role,
            token: tokengenerate(newUser._id)

        });

    } catch (error) {
        console.error("Registration error:", error);
        resp.status(500).json({ message: "Server error" });
    }
}
const login = async (req, resp) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return resp.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return resp.status(400).json({ message: "Invalid credentials" });
        }
        return resp.status(200).json({
            name: existingUser.name,
            email: existingUser.email,
            _id: existingUser._id,
            role: existingUser.role,
            token: tokengenerate(existingUser._id)
        });

    } catch (error) {
        resp.status(500).json({ message: "Server error" });
    }
}
const getalluser=async(req,resp)=>{
    try{
          const users=await user.find({}).select("-password")
          if(!users){
            return resp.status(404).json({message:"not found"})
          }

          resp.status(200).json(users);

    }catch (error) {
        resp.status(500).json({ message: "Server error" });
    }
}
export { register, login, getalluser };