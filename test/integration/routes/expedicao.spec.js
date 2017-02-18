import Expedicao from '../../../src/models/Expedicao';

describe('Routes: Expedicao', () => {
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

  const expectedExpedicao = {
    _id: '56cb91bdc3464f14678934ca',
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
      data: '2017-02-17T02:03:24.339Z',
    },
  };

  beforeEach(() => {
    const expedicao = new Expedicao(defaultExpedicao);
    expedicao._id = '56cb91bdc3464f14678934ca';
    return Expedicao.remove({})
      .then(() => expedicao.save());
  });

  describe('Route GET /api/expedicoes', () => {
    it('should return a list of expedicoes', (done) => {
      request
        .get('/api/expedicoes')
        .end((err, res) => {
          expect(res.body).to.be.eql([expectedExpedicao]);
          done(err);
        });
    });
  });

  describe('Route GET /api/expedicoes/{id}', () => {
    it('should return a expedicao', (done) => {
      request
        .get(`/api/expedicoes/${expectedExpedicao._id}`)
        .end((err, res) => {
          expect(res.body).to.be.eql(expectedExpedicao);
          done(err);
        });
    });
  });

  describe('Route POST /api/expedicoes', () => {
    it('should create a expedicao', (done) => {
      const customId = '56cb91bdc3464f14678934ba';
      const newExpedicao = Object.assign({}, { _id: customId }, defaultExpedicao);
      const expectedSavedExpedicao = {
        __v: 0,
        _id: customId,
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
          data: '2017-02-17T02:03:24.339Z',
        },
      };

      request
        .post('/api/expedicoes')
        .send(newExpedicao)
        .end((err, res) => {
          expect(res.body).to.be.eql(expectedSavedExpedicao);
          done(err);
        });
    });
  });

  describe('Route PUT /api/expedicoes/{id}', () => {
    it('should update a expedicao', (done) => {
      const updatedExpedicao = {
        volume: {
          caixa: {
            altura: 70,
            largura: 50,
          },
          produtos: [
            { nome: 'caneta', quandidade: 300 },
          ],
        },
      };

      request
        .put(`/api/expedicoes/${expectedExpedicao._id}`)
        .send(updatedExpedicao)
        .end((err, res) => {
          expect(res.body).to.be.eql({ n: 1, nModified: 1, ok: 1 });
          done(err);
        });
    });
  });

  describe('Route DELETE /api/expedicoes/{id}', () => {
    it('should delete a expedicao', (done) => {
      request
        .delete(`/api/expedicoes/${expectedExpedicao._id}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(204);
          done(err);
        });
    });
  });
});

