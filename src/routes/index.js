import express from 'express';
import expedicaoRoute from './expedicao';
import userRoute from './user';
import authRotue from './auth';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/api'));
router.get('/api/v1', (req, res) => res.send('Nogueira Nobre V1 API'));
router.use('/api/v1/auth', authRotue);
router.use('/api/v1/expedicoes', expedicaoRoute);
router.use('/api/v1/users', userRoute);

export default router;
