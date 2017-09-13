describe('Route: EmailBancoCotacao', () => {
  describe('POST /api/v1/email/bancocotacao/contato', () => {
    const defaultContato = {
      name: 'Tiao',
      email: 'tiao@gmail.com',
      tel: '62 996810057',
      msg: 'viiiiila!!',
    };

    it('Should send an email from nao-responda@bancodecotacao.com.br to contato@bancodecotacao.com.br', () => {
      request
        .post('/api/v1/email/bancocotacao/contato')
        .send(defaultContato)
        .expect(200);
    });

    it('Should receive a status code 412 when an email don\'t have a message, name, email', () => {
      request
        .post('/api/v1/email/bancocotacao/contato')
        .expect(412);
    });
  });

  describe('POST /api/v1/email/bancocotacao/cotacao', () => {
    const defaultCotacao = {
      name: 'Tiao',
      file: 'planilha.xls',
    };

    it('Should send an email to nao-responda@bancodecotacao.com.br to cotacao@bancodecotacao.com.br', () => {
      request
        .post('/api/v1/email/bancocotacao/cotacao')
        .send(defaultCotacao)
        .expect(200);
    });

    it('Should receive a status code 412 when an cotacao don\'t have the required parameters', () => {
      request
        .post('/api/v1/email/bancocotacao/cotacao')
        .expect(412);
    });
  });
});
