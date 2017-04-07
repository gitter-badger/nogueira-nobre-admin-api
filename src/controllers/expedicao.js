class ExpedicaoController {
  constructor(Expedicao) {
    this.Expedicao = Expedicao;
  }

  getAll(req, res) {
    return this.Expedicao.find({})
      .then(expedicoes => res.send(expedicoes))
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    return this.Expedicao.findById(req.params.expedicao_id)
      .then(expedicao => res.send(expedicao))
      .catch(err => res.status(400).send(err.message));
  }

  create(req, res) {
    return this.Expedicao.create(req.body)
      .then(expedicao => res.status(201).send(expedicao))
      .catch(err => res.status(412).send(err.message));
  }

  update(req, res) {
    return this.Expedicao.update(req.params.expedicao_id, req.body)
      .then(rowsUpdated => res.send(rowsUpdated))
      .catch(err => res.status(412).send(err.message));
  }

  delete(req, res) {
    return this.Expedicao.remove({ _id: req.params.expedicao_id })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  }
}

export default ExpedicaoController;
