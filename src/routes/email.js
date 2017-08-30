import express from 'express';
import AWS from 'aws-sdk';
import EmailController from '../controllers/email';

const router = express.Router();
const awsSES = new AWS.SES();
const emailController = new EmailController(awsSES);

router.post('/bancocotacao/contato', (req, res) => emailController.sendEmailBancoCotacaoContato(req, res));

export default router;
