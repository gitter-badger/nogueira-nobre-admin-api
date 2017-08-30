describe('Route: Email', () => {
  describe('POST /api/v1/email/bancocotacao/contato', () => {
    const defaultEmailMessage = {
      messageID: '123-abc',
    };

    it('Should send an email from contato@bancodecotacao.com.br', (done) => {
      request
      .post('/api/v1/email/bancocotacao/contato')
      .end((err, res) => {
        expect(res.body).to.be.eql(defaultEmailMessage);
        done();
      });
    });
  });
});
