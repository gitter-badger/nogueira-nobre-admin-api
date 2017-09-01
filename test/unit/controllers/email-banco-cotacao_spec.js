import AWS from 'aws-sdk';
import emailController from '../../../src/controllers/email-banco-cotacao';

describe('Controller: EmailBancoCotacao', () => {
  const defaultResponse = {
    send: sinon.spy(),
  };

  AWS.SES.prototype.sendEmail = sinon.stub();
  AWS.SES.prototype.sendRawEmail = sinon.stub();

  describe('sendEmailBancoCotacaoContato()', () => {
    const defaultRequest = {
      body: {
        name: 'Tiao',
        email: 'tiao@gmail.com',
        tel: '62996810057',
        msg: 'é noís',
      },
    };

    it('Should send an email from nao-responda@bancocotacao.com.br to contato@bancodecotacao.com.br', () => {
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
                    Nome: ${defaultRequest.body.name}

                    E-mail: ${defaultRequest.body.email}

                    Telefone: ${defaultRequest.body.tel}

                    Mensagem: ${defaultRequest.body.msg}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Contato ${defaultRequest.body.name}`,
          },
        },
      };

      AWS.SES.prototype.sendEmail.yields(false, { messageID: '123-abc' }); // Return of sendEmail callback

      const awsSES = new AWS.SES();
      awsSES.sendEmail.withArgs(params);

      return emailController.sendEmailBancoCotacaoContato(defaultRequest, defaultResponse)
        .then(() => {
          sinon.assert.calledWith(defaultResponse.send, { messageID: '123-abc' });
        });
    });

    it('Should return status code 412 when missing name, email or msg from request', () => {
      const request = {
        body: {},
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(412).returns(response);

      return emailController.sendEmailBancoCotacaoContato(request, response)
        .catch(() => {
          sinon.assert.calledWith(response.send, { err: true, msg: 'Nome, e-mail ou mensagem não foram preenchidos.' });
        });
    });

    it('Should return status code 400 when an error occurs in AWS SES', () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);

      AWS.SES.prototype.sendEmail.yields('Error', null); // Return of sendEmail callback

      const awsSES = new AWS.SES();
      awsSES.sendEmail.withArgs({});

      return emailController.sendEmailBancoCotacaoContato(defaultRequest, response)
        .catch(() => {
          sinon.assert.calledWith(response.send, { err: true, msg: 'Error' });
          sinon.assert.calledWith(response.status, 400);
        });
    });
  });

  describe('sendEmailBancoCotacaoCotacao()', () => {
    const defaultRequest = {
      body: {
        name: 'Tiao',
        file: 'planilha.xls',
      },
    };

    it('Should send an email from nao-responda@bancodecotacao to cotacao@bancodecotacao.com.br', () => {
      const params = {
        Source: 'nao-responda@bancodecotacao.com.br',
        Destinations: [
          'gustavo.mtborges@gmail.com',
        ],
        RawMessage: {
          Data: {},
        },
      };

      AWS.SES.prototype.sendRawEmail.yields(false, { messageID: '123-abc' }); // Return of sendRawEmail callback

      const awsSES = new AWS.SES();
      awsSES.sendRawEmail.withArgs(params);

      return emailController.sendEmailBancoCotacaoCotacao(defaultRequest, defaultResponse)
        .then(() => {
          sinon.assert.calledWith(defaultResponse.send, { messageID: '123-abc' });
        });
    });

    it('Should return status code 412 if name of file is not provided', () => {
      const request = {
        body: {},
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(412).returns(response);

      return emailController.sendEmailBancoCotacaoCotacao(request, response)
        .catch(() => {
          sinon.assert.calledWith(response.send, { err: true, msg: 'Nome ou arquivo não foram preenchidos.' });
          sinon.assert.calledWith(response.status, 412);
        });
    });

    it('Should return status code 400 when AWS SES return with an error', () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      AWS.SES.prototype.sendRawEmail = sinon.stub();
      AWS.SES.prototype.sendRawEmail.yields('Error', null); // Return of sendRawEmail callback

      const awsSES = new AWS.SES();
      awsSES.sendRawEmail.withArgs({});
      response.status.withArgs(400).returns(response);

      return emailController.sendEmailBancoCotacaoCotacao(defaultRequest, response)
        .catch(() => {
          sinon.assert.calledWith(response.send, { err: true, msg: 'Error' });
          sinon.assert.calledWith(response.status, 400);
        });
    });
  });
});
