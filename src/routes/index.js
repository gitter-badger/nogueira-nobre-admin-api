import express from 'express';
import expedicaoRoute from './expedicao';

const router = express.Router();

router.get('/api', (req, res) => res.sendFile('index.html', { root: __dirname }));
router.use('/api/expedicoes', expedicaoRoute);

export default router;
