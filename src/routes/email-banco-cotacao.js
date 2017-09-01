import express from 'express';
import emailController from '../controllers/email-banco-cotacao';

const router = express.Router();

router.post('/contato', (req, res) => emailController.sendEmailBancoCotacaoContato(req, res));
router.post('/cotacao', (req, res) => emailController.sendEmailBancoCotacaoCotacao(req, res));

export default router;
