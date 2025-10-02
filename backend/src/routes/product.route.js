import express from 'express';
import multer from "multer";
import path from "node:path";
import { addProduct } from '../controllers/product.controller.js';
import { isAuthenticated, isSeller } from '../middlewares/auth.middleware.js';

const router = express.Router();

const upload = multer({
    dest: path.resolve() + "\\public\\uploads",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB (1e7 bytes)
});

router.post("", isAuthenticated, isSeller, upload.single("imageURL"), addProduct);

export default router;