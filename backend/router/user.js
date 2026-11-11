import express from "express";

import protect from "../middleware/protect.js"
import admin from "../middleware/admin.js"
import {register,login,getalluser} from "../controllers/user.js";

const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/getalluser").get(protect,admin,getalluser);

export default router;
