import User from '../../../src/models/User';
import UserController from '../../../src/controllers/user';

describe('Controller: User', () => {
  const defaultUser = {
    _id: '123abc',
    __v: 0,
    username: 'tiaogalinha',
    password: '123abc',
    email: 'tiao@galinha.com',
    isAdmin: true,
  };

  const defaultUserLessPassword = {
    _id: '123abc',
    __v: 0,
    username: 'tiaogalinha',
    password: '123abc',
    email: 'tiao@galinha.com',
    isAdmin: true,
  };

  const defaultRequest = {
    params: {},
  };

  const response = {
    send: sinon.spy(),
    status: sinon.stub(),
  };

  describe('getAll():', () => {
    it('Should return a response with all users', () => {
      User.find = sinon.stub();
      User.find.withArgs({}).resolves([defaultUser]);
      const userController = new UserController(User);

      return userController.getAll(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.send, [defaultUser].map(value => delete value.password));
        });
    });

    it('Should return 400 status code when an error occurs', () => {
      response.status.withArgs(400).returns(response);
      User.find = sinon.stub();
      User.find.withArgs({}).rejects('Error');
      const userController = new UserController(User);

      return userController.getAll(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 400);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });

  describe('getById();', () => {
    const request = {
      params: { user_id: '123abc' },
    };

    it('Should return a response with an user', () => {
      User.findById = sinon.stub();
      User.findById.withArgs(request.params.user_id).resolves(defaultUser);
      const userController = new UserController(User);

      return userController.getById(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultUser);
        });
    });

    it('Should return 400 status code when an error occurs', () => {
      response.status.withArgs(400).returns(response);
      User.findById = sinon.stub();
      User.findById.withArgs().rejects('Error');
      const userController = new UserController(User);

      return userController.getById(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 400);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });

  describe('create():', () => {
    const newUser = {
      username: 'tiaogalinha',
      password: '123456',
      email: 'tiao@galinha.com',
    };

    const request = Object.assign({}, { body: newUser }, { defaultRequest });
    it('Should return a response with the created user', () => {
      response.status.withArgs(201).returns(response);
      User.create = sinon.stub();
      User.create.withArgs(request.body).resolves(defaultUser);
      const userController = new UserController(User);

      return userController.create(request, response)
        .then(() => {
          sinon.assert.calledWith(response.send, defaultUser);
        });
    });

    it('Should return 412 status if an error occurs', () => {
      response.status.withArgs(412).returns(response);
      User.create = sinon.stub();
      User.create.withArgs().rejects('Error');
      const userController = new UserController(User);

      return userController.create(defaultRequest, response)
        .then(() => {
          sinon.assert.calledWith(response.status, 412);
          sinon.assert.calledWith(response.send, 'Error');
        });
    });
  });
});
