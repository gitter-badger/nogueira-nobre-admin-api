import Expedicao from '../../../src/models/Expedicao';

describe('Route: Expedicoes', () => {
  const defaultExpedicao = {
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

  before(() => Expedicao.create(defaultExpedicao));
  after(() => Expedicao.remove({}));

  describe('GET /api/expedicoes', () => {
    it('should return a list of expedicoes', (done) => {
      request
        .get('/api/expedicoes')
        .end((err, res) => {
          expect(res.body).to.be.eql([defaultExpedicao]);
          done(err);
        });
    });
  });

  describe('GET /api/expedicoes/{expedicao_id}', () => {
    it('should return an expedicao', (done) => {
      request
        .get(`/api/expedicoes/${defaultExpedicao._id}`)
        .end((err, res) => {
          expect(res.body).to.be.eql(defaultExpedicao);
          done(err);
        });
    });
  });

  describe('POST /api/expedicoes', () => {
    it('should create an expedicao', (done) => {
      const newExpedicao = {
        _id: '56cb91bdc3464f14678934ba',
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

      request
        .post('/api/expedicoes')
        .send(newExpedicao)
        .end((err, res) => {
          expect(res.body).to.be.eql(newExpedicao);
          done(err);
        });
    });
  });

  describe('PUT /api/expedicoes/{expedicao_id}', () => {
    it('should update an expedicao', (done) => {
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
        .put(`/api/expedicoes/${defaultExpedicao._id}`)
        .send(updatedExpedicao)
        .end((err, res) => {
          expect(res.body).to.be.eql({ n: 1, nModified: 1, ok: 1 });
          done(err);
        });
    });
  });

  describe('DELETE /api/expedicoes/{expedicao_id}', () => {
    it('should delete an expedicao', (done) => {
      request
        .delete(`/api/expedicoes/${defaultExpedicao._id}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(204);
          done(err);
        });
    });
  });
});

