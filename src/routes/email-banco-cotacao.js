import express from 'express';
import multer from 'multer';
import emailController from '../controllers/email-banco-cotacao';

const upload = multer({ dest: 'anexos/' });
const router = express.Router();

router.post('/contato', (req, res) => emailController.sendEmailBancoCotacaoContato(req, res));
router.post('/cotacao', upload.single('anexo'), (req, res) => emailController.sendEmailBancoCotacaoCotacao(req, res));

export default router;
