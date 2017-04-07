import express from 'express';
import ExpedicaoController from '../controllers/expedicao';
import Expedicao from '../models/Expedicao';

const router = express.Router();
const expedicaoController = new ExpedicaoController(Expedicao);

router.get('/', (req, res) => expedicaoController.getAll(req, res));
router.get('/:expedicao_id', (req, res) => expedicaoController.getById(req, res));
router.post('/', (req, res) => expedicaoController.create(req, res));
router.put('/:expedicao_id', (req, res) => expedicaoController.update(req, res));
router.delete('/:expedicao_id', (req, res) => expedicaoController.delete(req, res));

export default router;
