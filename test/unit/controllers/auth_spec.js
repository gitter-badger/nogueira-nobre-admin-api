import User from '../../../src/models/User';
import AuthController from '../../../src/controllers/auth';

describe('Controller: Auth', () => {
  const defaultUser = {
    _id: '123abc',
    username: 'tiaogalinha',
    password: '123456',
    email: 'tiao@galinha.com',
    isAdmin: true,
  };

  const expectedUser = {
    _id: '123abc',
    username: 'tiaogalinha',
    email: 'tiao@galinha.com',
    isAdmin: true,
  };

  const response = {
    send: sinon.spy(),
    sendStatus: sinon.spy(),
    status: sinon.stub(),
  };

  describe('validateCredentials():', () => {
    const request = {
      body: {
        username: 'tiaogalinha',
        password: '123456',
      },
    };
    it('Should return a token and user data when your credentials are valid', () => {
      User.findOne = sinon.stub();
      User.findOne.withArgs({ username: request.body.username }).resolves(defaultUser);
      const authController = new AuthController(User);

      return authController.validateCredentials(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, { token: sinon.match.string, user: expectedUser });
        });
    });
  });
});
