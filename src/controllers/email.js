import AWS from 'aws-sdk';

export default function sendEmailBancoCotacaoContato(req, res) {
  return new Promise((resolve, reject) => {
    if (!req.body.name || !req.body.email || !req.body.msg) {
      res.status(412)
        .send({
          err: true,
          msg: 'Nome, e-mail ou mensagem não foram preenchidos.',
        });
    }
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

    const awsSES = new AWS.SES();

    awsSES.sendEmail(params, (err, data) => {
      if (err) {
        reject();
        res.status(400).send({ err: true, msg: err });
      } else {
        resolve();
        res.send(data);
      }
    });
  });
}
