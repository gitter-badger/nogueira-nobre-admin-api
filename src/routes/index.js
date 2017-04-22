import express from 'express';
import expedicaoRoute from './expedicao';
import userRoute from './user';
import authRotue from './auth';

const router = express.Router();

router.get('/api', (req, res) => res.send('Nogueira Nobre V1 API'));
router.use('/api/auth', authRotue);
router.use('/api/expedicoes', expedicaoRoute);
router.use('/api/users', userRoute);

export default router;
