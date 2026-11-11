import express from "express";

import protect from "../middleware/protect.js"
import admin from "../middleware/admin.js"
import {products,getproduct,createproduct,updateproduct,deleteproduct} from "../controllers/product.js";
import storage from "../config/cloud.js";
import multer from "multer"

const uploads=multer({storage:storage});
const router=express.Router();
                                
router.route("/products").get(products);
router.route("/:id").get(getproduct);
router.route("/products").post(uploads.single("image"), protect, admin, createproduct);
router.route("/:id").put(uploads.single("image"), protect, admin, updateproduct);
router.route("/:id").delete(protect, admin, deleteproduct)

export default router;