import AWS from 'aws-sdk';

function sendEmailBancoCotacaoContato(req, res) {
  return new Promise((resolve, reject) => {
    if (!req.body.name || !req.body.email || !req.body.msg) {
      res.status(412).send({ err: true, msg: 'Nome, e-mail ou mensagem não foram preenchidos.' });
      reject();
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
  return new Promise((resolve, reject) => {
    if (!req.body.name || !req.body.file || req.body.toAddress) {
      res.status(412).send({ err: true, msg: 'Nome ou arquivo não foram preenchidos.' });
      reject();
    } else {
      const awsSES = new AWS.SES();

      const params = {
        Source: 'nao-responda@bancodecotacao.com.br',
        Destinations: [
          req.body.toAddress,
        ],
        RawMessage: {
          Data: `${req.body.file}`,
        },
      };

      awsSES.sendRawEmail(params, (err, data) => {
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

const emailController = {
  sendEmailBancoCotacaoContato,
  sendEmailBancoCotacaoCotacao,
};

export default emailController;
