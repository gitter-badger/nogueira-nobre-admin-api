import express from 'express';
import sendEmailBancoCotacaoContato from '../controllers/email';

const router = express.Router();

router.post('/bancocotacao/contato', (req, res) => sendEmailBancoCotacaoContato(req, res));

export default router;
