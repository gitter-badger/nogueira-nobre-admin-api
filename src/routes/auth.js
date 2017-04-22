import express from 'express';
import AuthController from '../controllers/auth';
import User from '../models/User';

const router = express.Router();
const authController = new AuthController(User);

router.post('/login', (req, res) => authController.validateCredentials(req, res));

export default router;

