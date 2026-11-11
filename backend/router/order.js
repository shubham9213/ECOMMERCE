import express from "express";
import {getallorder,myorder,updatestatus,createorder} from "../controllers/order.js";
import protect from "../middleware/protect.js"
import admin from "../middleware/admin.js";

const router=express.Router();

router.route("/allorder").get(protect,admin,getallorder); //allrodeer
router.route("/myorder").get(protect,myorder);

router.route("/status").put(protect,admin,updatestatus);

router.route("/createorder").post(protect,createorder)


export default router;