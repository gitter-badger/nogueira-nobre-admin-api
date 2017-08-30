import AWS from 'aws-sdk';
import EmailController from '../../../src/controllers/email';

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
    it('Should send an email from contato@bancocotacao.com.br', () => {
      AWS.SES.prototype.sendEmail = sinon.stub();
      AWS.SES.prototype.sendEmail.yields(null, { messageID: '123-abc' });

      const params = {
        Destination: {
          ToAddresses: [
            'contato@bancodecotacao.com.br',
          ],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `Nome: ${request.body.name}
                     E-mail: ${request.body.email}
                     Telefone: ${request.body.tel}
                     Mensagem: ${request.body.msg}`,
            },
            Text: {
              Charset: 'UTF-8',
              Data: `Nome: ${request.body.name}
                     E-mail: ${request.body.email}
                     Telefone: ${request.body.tel}
                     Mensagem: ${request.body.msg}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Cotação ${request.body.name}`,
          },
        },
        ReplyToAddresses: [
        ],
        ReturnPath: '',
        ReturnPathArn: '',
        Source: 'contato@bancodecotacao.com.br',
        SourceArn: '',
      };

      const awsSES = new AWS.SES();
      awsSES.sendEmail.withArgs(params);

      const emailController = new EmailController(awsSES);

      return emailController.sendEmailBancoCotacaoContato(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, { messageID: '123-abc' });
        });
    });
  });
});
