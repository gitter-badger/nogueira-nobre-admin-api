describe('Route: EmailNogueiraNobre', () => {
  describe('POST /api/v1/email/nogueiranobre/contato', () => {
    const defaultContato = {
      name: 'Teste',
      email: 'teste@gmail.com',
      tel: '62 996810057',
      msg: 'viiiiila!!',
      toAddress: 'teste@nogueiranobre.com',
    };

    it('Should send an email from nao-responda@nogueiranobre.com to requested email', () => {
      request
        .post('/api/v1/email/nogueiranobre/contato')
        .send(defaultContato)
        .expect(200);
    });

    it('Should receive a status code 412 when an email don\'t have a message, name, email', () => {
      request
        .post('/api/v1/email/nogueiranobre/contato')
        .expect(412);
    });
  });
});
