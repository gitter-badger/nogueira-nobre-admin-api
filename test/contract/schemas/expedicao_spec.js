import Expedicao from '../../../src/models/Expedicao';

describe('Schema: Expedicoes', () => {
  const defaultExpedicao = {
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
      data: new Date('2017-02-17T02:03:24.339Z'),
    },
  };

  beforeEach((done) => {
    const expedicao = new Expedicao(defaultExpedicao);
    Expedicao.remove({})
      .then(() => expedicao.save())
      .then(() => done());
  });

  describe('GET /api/v1/expedicoes', () => {
    const expedicaoSchemaList = Joi.array().items(Joi.object().keys({
      _id: Joi.string(),
      __v: Joi.number(),
      nota: Joi.number(),
      volume: Joi.object().keys({
        caixa: Joi.object().keys({
          altura: Joi.number(),
          largura: Joi.number(),
        }),
        produtos: Joi.array().items(Joi.object().keys({
          nome: Joi.string(),
          quandidade: Joi.number(),
        })),
      }),
      empenho: Joi.object().keys({
        numero: Joi.number(),
        orgao: Joi.object().keys({
          nome: Joi.string(),
          cnpj: Joi.number(),
        }),
        data: Joi.date().iso(),
      }),
    }));

    it('Should validade a list of expedicoes', (done) => {
      request
      .get('/api/v1/expedicoes')
      .end((err, res) => {
        joiAssert(res.body, expedicaoSchemaList);
        done();
      });
    });
  });
});
