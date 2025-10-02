import express from 'express';
import { registerUser, verifyEmail, userLogin, profile, logutUser } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', userLogin);
router.get('/profile', isAuthenticated, profile); // Protected route to get user profile
router.get('/logout', isAuthenticated, logutUser);

export default router;