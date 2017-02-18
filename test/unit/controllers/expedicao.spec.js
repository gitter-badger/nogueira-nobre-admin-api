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
  });
});
