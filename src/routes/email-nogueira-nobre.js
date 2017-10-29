import express from 'express';
import emailNogueiraNobreController from '../controllers/email-nogueira-nobre';

const router = express.Router();

router.post('/contato', (req, res) => emailNogueiraNobreController.sendEmailNogueiraNobreContato(req, res));

export default router;
