import express from 'express';
import { registerUser, verifyEmail, userLogin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', userLogin);

export default router;