import express from 'express';
import expedicaoRoute from './expedicao';
import userRoute from './user';
import authRotue from './auth';
import emailRoute from './email';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/api/v1'));
router.get('/api/v1', (req, res) => res.send('Nogueira Nobre V1 API'));
router.use('/api/v1/auth', authRotue);
router.use('/api/v1/expedicoes', expedicaoRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/email', emailRoute);

export default router;
