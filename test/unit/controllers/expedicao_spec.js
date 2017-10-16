import Expedicao from '../../../src/models/Expedicao';
import ExpedicaoController from '../../../src/controllers/expedicao';

describe('Controllers: Expedicao', () => {
  const defaultExpedicao = {
    _id: '123abc',
    __v: 0,
    nota: 123,
    volume: {
      caixa: {
        altura: 30,
        largura: 50,
      },
      produtos: [
        { nome: 'papel', quandidade: 30 },
      ],
    },
    empenho: {
      numero: 123,
      orgao: { nome: 'Papelaria do jão', cnpj: 123123456 },
      data: new Date(),
    },
  };
  const defaultRequest = {
    params: {},
  };

  const response = {
    send: sinon.spy(),
    sendStatus: sinon.spy(),
    status: sinon.stub(),
  };

  describe('getAll(): Get all expedicoes', () => {
    it('Should return a response with a list of expedicoes', () => {
      Expedicao.find = sinon.stub();
      Expedicao.find.withArgs({}).resolves([defaultExpedicao]);
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.getAll(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultExpedicao]);
        });
    });

    it('Should return 400 status code when an error occurs', () => {
      response.status.withArgs(400).returns(response);
      Expedicao.find = sinon.stub();
      Expedicao.find.withArgs({}).rejects('Error');

      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.getAll(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 400);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });

  describe('getById(): Get an expedicao', () => {
    it('Should return a response with an expedicao', () => {
      const request = {
        params: { expedicao_id: '123abc' },
      };
      Expedicao.findById = sinon.stub();
      Expedicao.findById.withArgs(request.params.expedicao_id).resolves(defaultExpedicao);
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultExpedicao);
        });
    });

    it('Should return 400 status code when an error occurs', () => {
      response.status.withArgs(400).returns(response);
      Expedicao.findById = sinon.stub();
      Expedicao.findById.withArgs().rejects('Error');
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.getById(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 400);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });

  describe('create(): Create an expedicao', () => {
    it('Should create an expedicao', () => {
      const newExpedicao = {
        nota: 123,
        volume: {
          caixa: {
            altura: 30,
            largura: 50,
          },
          produtos: [
            { nome: 'papel', quandidade: 30 },
          ],
        },
        empenho: {
          numero: 123,
          orgao: { nome: 'Papelaria do jão', cnpj: 123123456 },
          data: new Date(),
        },
      };
      const request = Object.assign({}, { body: newExpedicao }, defaultRequest);
      response.status.withArgs(201).returns(response);
      Expedicao.create = sinon.stub();
      Expedicao.create.withArgs(request.body).resolves(defaultExpedicao);
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.create(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultExpedicao);
        });
    });

    it('Should return 412 status code when an error occurs', () => {
      response.status.withArgs(412).returns(response);
      Expedicao.create = sinon.stub();
      Expedicao.create.withArgs().rejects('Error');
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.create(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 412);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });

  describe('update(): Update an expedicao', () => {
    it('Should update an expedicao', () => {
      const request = {
        params: { expedicao_id: '123abc' },
        body: {
          volume: {
            caixa: {
              altura: 100,
              largura: 200,
            },
          },
        },
      };
      const rowsUpdated = { n: 1, nModified: 1, ok: 1 };
      Expedicao.update = sinon.stub();
      Expedicao.update
      .withArgs({ _id: request.params.expedicao_id }, request.body)
      .resolves(rowsUpdated);
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.update(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, rowsUpdated);
        });
    });

    it('Should return 412 status code when an error occurs', () => {
      response.status.withArgs(412).returns(response);
      Expedicao.update = sinon.stub();
      Expedicao.update
      .withArgs()
      .rejects('Error');
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.update(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 412);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });

  describe('delete(): Delete an expedicao', () => {
    it('Should delete a expedicao', () => {
      const request = {
        params: { expedicao_id: '123abc' },
      };
      Expedicao.remove = sinon.stub();
      Expedicao.remove.withArgs({ _id: request.params.expedicao_id }).resolves(204);
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.delete(request, response)
        .then(() => {
          sinon.assert.calledWith(response.sendStatus, 204);
        });
    });

    it('Should return 400 status code with an error occurs', () => {
      response.status.withArgs(400).returns(response);
      Expedicao.remove = sinon.stub();
      Expedicao.remove.withArgs().rejects('Error');
      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.delete(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 400);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });
});
