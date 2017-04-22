import User from '../../../src/models/User';

describe('Route: Auth', () => {
  const defaultUser = {
    _id: '56cb91bdc3464f14678934ca',
    __v: 0,
    username: 'tiaogalinha',
    password: '123456',
    email: 'tiao@galinha.com',
    isAdmin: true,
  };

  const expectedUser = {
    _id: '56cb91bdc3464f14678934ca',
    username: 'tiaogalinha',
    email: 'tiao@galinha.com',
    isAdmin: true,
  };

  before(() => User.create(defaultUser));

  after(() => User.remove({}));

  describe('POST /api/auth/login', () => {
    const credentials = {
      username: 'tiaogalinha',
      password: '123456',
    };

    it('Should return a token and user data if your credentials are valid', (done) => {
      request
        .post('/api/auth/login')
        .send(credentials)
        .end((err, res) => {
          expect(res.body.token).to.be.a('string');
          expect(res.body.user).to.be.eql(expectedUser);
          done(err);
        });
    });
  });
});
