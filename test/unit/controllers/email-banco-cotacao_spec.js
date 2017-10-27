import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import emailController from '../../../src/controllers/email-banco-cotacao';

describe('Controller: EmailBancoCotacao', () => {
  describe('sendEmailBancoCotacaoContato()', () => {
    it('Should send an email', (done) => {
      const request = {
        body: {
          name: 'Tiao',
          email: 'tiao@gmail.com',
          tel: '62996810057',
          msg: 'viiiila!',
          toAddress: 'teste@bancodecotacao.com.br',
        },
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      const params = {
        Source: 'nao-responda@bancodecotacao.com.br',
        Destination: {
          ToAddresses: [
            request.body.toAddress,
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

      AWS.SES.prototype.sendEmail = sinon.stub();
      AWS.SES.prototype.sendRawEmail = sinon.stub();
      AWS.SES.prototype.sendEmail.yields(false, { messageID: '123-abc' }); // Return of sendEmail callback
      response.status.withArgs(200).returns(response);

      const awsSES = new AWS.SES();
      awsSES.sendEmail.withArgs(params);

      emailController.sendEmailBancoCotacaoContato(request, response);
      sinon.assert.calledWith(response.status, 200);
      sinon.assert.calledWith(response.send, { messageID: '123-abc' });
      done();
    });

    it('Should return status code 412 when missing name, email or msg from request', (done) => {
      const request = {
        body: {},
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(412).returns(response);

      emailController.sendEmailBancoCotacaoContato(request, response);
      sinon.assert.calledWith(response.status, 412);
      sinon.assert.calledWith(response.send, { err: true, msg: 'Nome, e-mail ou mensagem não foram preenchidos.' });
      done();
    });

    it('Should return status code 400 when an error occurs in AWS SES', (done) => {
      const request = {
        body: {
          name: 'Tiao',
          email: 'tiao@gmail.com',
          tel: '62996810057',
          msg: 'viiiila!',
          toAddress: 'teste@bancodecotacao.com.br',
        },
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);

      AWS.SES.prototype.sendEmail = sinon.stub();
      AWS.SES.prototype.sendRawEmail = sinon.stub();
      AWS.SES.prototype.sendEmail.yields('Error', null); // Return of sendEmail callback

      const awsSES = new AWS.SES();
      awsSES.sendEmail.withArgs({});

      emailController.sendEmailBancoCotacaoContato(request, response);
      sinon.assert.calledWith(response.status, 400);
      sinon.assert.calledWith(response.send, { err: true, msg: 'Error' });
      done();
    });
  });

  describe('sendEmailBancoCotacaoCotacao()', () => {
    it('Should send an email', (done) => {
      const request = {
        body: {
          name: 'Tiao',
          tel: '62996810057',
          email: 'teste@teste.com',
          orgao: 'Orgao teste',
          cnpj: '22904368000117',
          toAddress: 'teste@bancodecotacao.com.br',
        },
        file: {
          originalname: 'planilha.xls ',
          path: '/home/projeto/planilha.xls',
        },
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      const params = {
        from: 'nao-responda@bancodecotacao.com.br',
        to: request.body.toAddress,
        subject: `Cotação ${request.body.name}`,
        text: `
                  Nome: ${request.body.name}
                  Telefone: ${request.body.tel}
                  E-mail: ${request.body.email}
                  Orgao: ${request.body.orgao}
                  CNPJ: ${request.body.cnpj}`,
        attachments: [
          {
            filename: request.file.originalname,
            path: request.file.path,
          },
        ],
      };

      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({
          apiVersion: '2010-12-01',
        }),
      });

      transporter.sendMail = sinon.stub();
      transporter.sendMail.withArgs(params).yields(null, { received: true });
      response.status.withArgs(200).returns(response);

      emailController.sendEmailBancoCotacaoCotacao(request, response);
      setTimeout(() => {
        sinon.assert.calledWith(response.status, 200);
        sinon.assert.calledWith(response.send, { received: true });
      }, 1 * 1000);
      done();
    });

    it('Should return status code 412 if name, file or toAddress is not provided', (done) => {
      const request = {
        body: {},
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(412).returns(response);

      emailController.sendEmailBancoCotacaoCotacao(request, response);
      sinon.assert.calledWith(response.status, 412);
      sinon.assert.calledWith(response.send, { err: true, msg: 'Parâmetros obrigatórios não foram preenchidos.' });
      done();
    });

    it('Should return status code 400 when AWS SES return with an error', (done) => {
      const request = {
        body: {
          name: 'Tiao',
          tel: '62996810057',
          email: 'teste@teste.com',
          orgao: 'Orgao teste',
          cnpj: '22904368000117',
          toAddress: 'teste@bancodecotacao.com.br',
        },
        file: {
          originalname: 'planilha.xls ',
          path: '/home/projeto/planilha.xls',
        },
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };


      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({
          apiVersion: '2010-12-01',
        }),
      });

      transporter.sendMail = sinon.stub();
      transporter.sendMail.withArgs({}).yields('Error', null);

      response.status.withArgs(400).returns(response);

      emailController.sendEmailBancoCotacaoCotacao(request, response);
      setTimeout(() => {
        sinon.assert.calledWith(response.status, 400);
        sinon.assert.calledWith(response.send, 'Error');
      }, 1 * 1000);
      done();
    });
  });
});
