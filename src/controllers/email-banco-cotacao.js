import AWS from 'aws-sdk';
import path from 'path';
import nodemailer from 'nodemailer';

function sendEmailBancoCotacaoContato(req, res) {
  return new Promise((resolve, reject) => {
    if (!req.body.name || !req.body.email || !req.body.msg) {
      res.status(412)
        .send({
          err: true,
          msg: 'Nome, e-mail ou mensagem não foram preenchidos.',
        });
    } else {
      const awsSES = new AWS.SES();

      const params = {
        Source: 'nao-responda@bancodecotacao.com.br',
        Destination: {
          ToAddresses: [
            req.body.toAddress,
          ],
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: `
                    Nome: ${req.body.name}
                    E-mail: ${req.body.email}
                    Telefone: ${req.body.tel}
                    Mensagem: ${req.body.msg}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Contato ${req.body.name}`,
          },
        },
      };

      awsSES.sendEmail(params, (err, data) => {
        if (err) {
          res.status(400).send({ err: true, msg: err });
          reject();
        } else {
          res.send(data);
          resolve();
        }
      });
    }
  });
}

function sendEmailBancoCotacaoCotacao(req, res) {
  if (!req.body.name || !req.body.tel || !req.file.path || !req.body.toAddress) {
    res.status(412)
      .send({
        err: true,
        msg: 'Parâmetros obrigatórios não foram preenchidos.',
      });
  } else {
    // configure AWS SDK
    AWS.config.loadFromPath(path.resolve(`${__dirname}/../config/aws.config.json`));
    // create Nodemailer SES transporter
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: '2010-12-01',
      }),
    });

    transporter.sendMail({
      from: 'nao-responda@bancodecotacao.com.br',
      to: req.body.toAddress,
      subject: `Cotação ${req.body.name}`,
      text: `
              Nome: ${req.body.name}
              Telefone: ${req.body.tel}
              E-mail: ${req.body.email}`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    }, (err, info) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(info);
    });
  }
}

const emailController = {
  sendEmailBancoCotacaoContato,
  sendEmailBancoCotacaoCotacao,
};

export default emailController;
