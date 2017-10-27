import express from 'express';
import emailBancoCotacaoRoute from './email-banco-cotacao';
import emailNogueiraNobre from './email-nogueira-nobre';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/api/v1'));
router.get('/api/v1', (req, res) => res.send('Nogueira Nobre V1 API'));
router.use('/api/v1/email/banco-de-cotacao', emailBancoCotacaoRoute);
router.use('/api/v1/email/nogueira-nobre', emailNogueiraNobre);

export default router;
