import express from "express";

import protect from "../middleware/protect.js"
import {createorder,verify} from "../controllers/payment.js";
const router=express.Router();


router.route("/createorder").post(protect,createorder);
router.route("/verify").post(protect,verify)
export default router;
