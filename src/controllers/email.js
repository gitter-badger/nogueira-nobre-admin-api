class EmailController {
  constructor(awsSES) {
    this.awsSES = awsSES;
  }

  sendEmailBancoCotacaoContato(req, res) {
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
            Data: `Nome: ${req.body.name}
                   E-mail: ${req.body.email}
                   Telefone: ${req.body.tel}
                   Mensagem: ${req.body.msg}`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `Nome: ${req.body.name}
                   E-mail: ${req.body.email}
                   Telefone: ${req.body.tel}
                   Mensagem: ${req.body.msg}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Cotação ${req.body.name}`,
        },
      },
      ReplyToAddresses: [
      ],
      ReturnPath: '',
      ReturnPathArn: '',
      Source: 'contato@bancodecotacao.com.br',
      SourceArn: '',
    };

    return new Promise((resolve, reject) => {
      this.awsSES.sendEmail(params, (err, data) => {
        if (err) {
          res.status(400).send({ msg: err });
          reject();
        } else {
          res.send(data);
          resolve();
        }
      });
    });
  }
}

export default EmailController;
