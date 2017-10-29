import AWS from 'aws-sdk';
import emailNogueiraNobreController from '../../../src/controllers/email-nogueira-nobre';

describe('Controller: EmailNogueiraNobre', () => {
  const defaultResponse = {
    send: sinon.spy(),
  };

  AWS.SES.prototype.sendEmail = sinon.stub();
  AWS.SES.prototype.sendRawEmail = sinon.stub();

  describe('sendEmailNogueiraNobreContato()', () => {
    const defaultRequest = {
      body: {
        name: 'Tiao',
        email: 'tiao@gmail.com',
        tel: '62996810057',
        msg: 'contato nogueira nobre',
        toAddress: 'teste@nogueiranobre.com',
      },
    };

    it('Should send an email from nao-responda@nogueiranobre.com to requested email', () => {
      const params = {
        Source: 'nao-responda@nogueiranobre.com',
        Destination: {
          ToAddresses: [
            defaultRequest.body.toAddress,
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

      return emailNogueiraNobreController
      .sendEmailNogueiraNobreContato(defaultRequest, defaultResponse)
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

      return emailNogueiraNobreController.sendEmailNogueiraNobreContato(request, response)
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

      return emailNogueiraNobreController.sendEmailNogueiraNobreContato(defaultRequest, response)
        .catch(() => {
          sinon.assert.calledWith(response.send, { err: true, msg: 'Error' });
          sinon.assert.calledWith(response.status, 400);
        });
    });
  });
});
