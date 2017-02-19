import Expedicao from '../../../src/models/Expedicao';
import ExpedicaoController from '../../../src/controllers/expedicao';

describe('Controllers: Expedicao', () => {
  const defaultExpedicao = {
    _id: '123AS',
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

  describe('getAll(): Get all expedicoes', () => {
    it('Should call send with a list of expedicoes', () => {
      const response = {
        send: sinon.spy(),
      };
      Expedicao.find = sinon.stub();
      Expedicao.find.withArgs({}).resolves([defaultExpedicao]);

      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.getAll(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultExpedicao]);
        });
    });

    it('Should return 400 status code when an error occours', () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
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
    it('Should call send with an expedicao', () => {
      const fakeId = 'fake-id';
      const request = {
        params: { id: fakeId },
      };
      const response = {
        send: sinon.spy(),
      };
      Expedicao.findById = sinon.stub();
      Expedicao.findById.withArgs(fakeId).resolves(defaultExpedicao);

      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultExpedicao);
        });
    });

    it('Should return 400 status code when an error occours', () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
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
      const requestWithBody = Object.assign({}, { body: newExpedicao }, defaultRequest);
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
      response.status.withArgs(201).returns(response);
      Expedicao.create = sinon.stub();
      Expedicao.create.withArgs(requestWithBody.body).resolves(defaultExpedicao);

      const expedicaoController = new ExpedicaoController(Expedicao);

      return expedicaoController.create(requestWithBody, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultExpedicao);
        });
    });

    it('Should return 412 status code when an error occours', () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
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
        params: { id: 'fake-id' },
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
      const response = {
        send: sinon.spy(),
      };

      Expedicao.update = sinon.stub();
      Expedicao.update.withArgs(request.params.id, request.body).resolves(rowsUpdated);

      const expedicaoController = new ExpedicaoController(Expedicao);
      return expedicaoController.update(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, rowsUpdated);
        });
    });

    it('Should return 412 status code when an error occours', () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };
      response.status.withArgs(412).returns(response);
      Expedicao.update = sinon.stub();
      Expedicao.update.withArgs().rejects('Error');

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
      const fakeId = 'fake-id';
      const request = {
        params: { id: fakeId },
      };
      const response = {
        sendStatus: sinon.spy(),
      };

      Expedicao.remove = sinon.stub();
      Expedicao.remove.withArgs({ _id: fakeId }).resolves(204);

      const expedicaoController = new ExpedicaoController(Expedicao);
      return expedicaoController.delete(request, response)
      .then(() => {
        sinon.assert.calledWith(response.sendStatus, 204);
      });
    });

    it('Should return 400 status code with an error occours', () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

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
