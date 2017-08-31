import AWS from 'aws-sdk';
import sendEmailBancoCotacaoContato from '../../../src/controllers/email';

describe('Controller: Email', () => {
  const response = {
    send: sinon.spy(),
    status: sinon.stub(),
  };

  const request = {
    body: {
      name: 'Tiao',
      email: 'tiao@gmail.com',
      tel: '62996810057',
      msg: 'é noís',
    },
  };

  describe('sendEmailBancoCotacaoContato()', () => {
    it('Should send an email from nao-responda@bancocotacao.com.br to contato@bancodecotacao.com.br', () => {
      AWS.SES.prototype.sendEmail = sinon.stub();
      AWS.SES.prototype.sendEmail.yields(null, { messageID: '123-abc' });

      const params = {
        Source: 'nao-responda@bancodecotacao.com.br',
        Destination: {
          ToAddresses: [
            'contato@bancodecotacao.com.br',
          ],
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: `
                    Nome: ${request.body.name}

                    E-mail: ${request.body.email}

                    Telefone: ${request.body.tel}

                    Mensagem: ${request.body.msg}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Contato ${request.body.name}`,
          },
        },
      };

      const awsSES = new AWS.SES();
      awsSES.sendEmail.withArgs(params);

      return sendEmailBancoCotacaoContato(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, { messageID: '123-abc' });
        });
    });

    it('Should return status code 412 when missing name, email or msg from request', () => {
      const requestWhitoutFields = {
        body: {},
      };

      response.status.withArgs(412).returns(response);

      return sendEmailBancoCotacaoContato(requestWhitoutFields, response)
        .then(() => {
          sinon.assert.calledWith(response.send, { err: true, msg: 'Nome, e-mail ou mensagem não foram preenchidos.' });
        });
    });
  });
});
