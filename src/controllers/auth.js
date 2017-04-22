import { createJWT } from '../config/auth';

export default class AuthController {
  constructor(User) {
    this.User = User;
  }

  validateCredentials(req, res) {
    return this.User.findOne({ username: req.body.username })
      .then((user) => {
        if (user.password === req.body.password) {
          const payload = {
            sub: user._id,
          };
          res.send({
            token: createJWT(payload),
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
            },
          });
        } else {
          res.sendStatus(401);
        }
      })
      .catch(err => res.status(401).send(err.message));
  }
}
