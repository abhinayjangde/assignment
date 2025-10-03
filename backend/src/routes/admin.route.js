import express from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import { getAllUsers } from '../controllers/admin.controller.js';

const router = express.Router();


router.get("/users", isAuthenticated, isAdmin, getAllUsers)

export default router;