import express from 'express';
import expedicaoRoute from './expedicao';
import userRoute from './user';

const router = express.Router();

router.get('/api', (req, res) => res.sendFile('index.html', { root: __dirname }));
router.use('/api/expedicoes', expedicaoRoute);
router.use('/api/users', userRoute);

export default router;
