import User from '../../../src/models/User';
import { createJWT } from '../../../src/config/auth';

describe('Route: Users', () => {
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
    __v: 0,
    username: 'tiaogalinha',
    email: 'tiao@galinha.com',
    isAdmin: true,
  };
  let token;

  before((done) => {
    User.create(defaultUser)
      .then((user) => {
        token = createJWT({ sub: user._id });
      })
      .then(() => done());
  });

  after(() => User.remove({}));

  describe('GET /api/users', () => {
    it('Should return a list of users', (done) => {
      request
        .get('/api/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body).to.be.eql([expectedUser]);
          done();
        });
    });
  });
});
