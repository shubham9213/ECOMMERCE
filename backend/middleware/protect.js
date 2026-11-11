import jwt from "jsonwebtoken";
import user from "../models/user.js";



 async function protect (req, resp, next) {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await user.findById(decode.id).select("-password");
            next();

        }
    } catch (error) {
        resp.status(401).json({ message: "Not authorized, token failed" });
    }
}
export default protect;
