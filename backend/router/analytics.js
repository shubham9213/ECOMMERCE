import express from "express";
import protect from "../middleware/protect.js"
import admin from "../middleware/admin.js";
import getanalytics from "../controllers/analytics.js";

const router=express.Router();

router.route("/admin/analytics").get(protect,admin,getanalytics);

export default router;