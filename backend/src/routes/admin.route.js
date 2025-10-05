import express from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import { getAllSellers, getAllUsers, getPayments } from '../controllers/admin.controller.js';

const router = express.Router();


router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.get("/sellers", isAuthenticated, isAdmin, getAllSellers);
router.get("/payments", isAuthenticated, isAdmin, getPayments);

export default router;