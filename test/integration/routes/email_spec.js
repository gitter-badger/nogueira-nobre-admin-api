describe('Route: Email', () => {
  describe('POST /api/v1/email/bancocotacao/contato', () => {
    const defaultEmail = {
      name: 'Tiao',
      email: 'tiao@gmail.com',
      tel: '62 996810057',
      msg: 'viiiiila!!',
    };

    it('Should send an email from nao-responda@bancodecotacao.com.br to contato@bancodecotacao.com.br', (done) => {
      request
        .post('/api/v1/email/bancocotacao/contato')
        .send(defaultEmail)
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
});
