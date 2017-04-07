import express from 'express';
import User from '../models/User';
import UserController from '../controllers/user';
import { authenticate } from '../config/auth';

const router = express.Router();
const userController = new UserController(User);

router.get('/', authenticate(), (req, res) => userController.getAll(req, res));
router.get('/:user_id', authenticate(), (req, res) => userController.getById(req, res));
router.post('/', authenticate(), (req, res) => userController.create(req, res));

export default router;
