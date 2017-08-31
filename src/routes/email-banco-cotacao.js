import express from 'express';
import sendEmailBancoCotacaoContato from '../controllers/email-banco-cotacao';

const router = express.Router();

router.post('/contato', (req, res) => sendEmailBancoCotacaoContato(req, res));

export default router;
