describe('Route: EmailBancoCotacao', () => {
  describe('POST /api/v1/email/bancocotacao/contato', () => {
    const defaultContato = {
      name: 'Tiao',
      email: 'tiao@gmail.com',
      tel: '62 996810057',
      msg: 'viiiiila!!',
    };

    it('Should send an email from nao-responda@bancodecotacao.com.br to contato@bancodecotacao.com.br', (done) => {
      request
        .post('/api/v1/email/bancocotacao/contato')
        .send(defaultContato)
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          done();
        });
    });

    it('Should receive a status code 412 when an email don\'t have a message, name, email', (done) => {
      request
        .post('/api/v1/email/bancocotacao/contato')
        .end((err, res) => {
          expect(res.status).to.be.eql(412);
          done();
        });
    });
  });

  describe('POST /api/v1/email/bancocotacao/cotacao', () => {
    const defaultCotacao = {
      name: 'Tiao',
      file: 'planilha.xls',
    };

    it('Should send an email to nao-responda@bancodecotacao.com.br to cotacao@bancodecotacao.com.br', (done) => {
      request
       .post('/api/v1/email/bancocotacao/cotacao')
       .send(defaultCotacao)
       .end((err, res) => {
         expect(res.status).to.be.eql(200);
         done();
       });
    });

    it('Should send an email to nao-responda@bancodecotacao.com.br to cotacao@bancodecotacao.com.br', (done) => {
      request
       .post('/api/v1/email/bancocotacao/cotacao')
       .end((err, res) => {
         expect(res.status).to.be.eql(412);
         done();
       });
    });
  });
});
