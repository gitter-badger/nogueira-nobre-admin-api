export default class UserController {
  constructor(User) {
    this.User = User;
  }

  getAll(req, res) {
    return this.User.find({}, { username: 1, email: 1, isAdmin: 1 })
    .then(users => res.send(users))
    .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    return this.User.findById(req.params.user_id)
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err.message));
  }

  create(req, res) {
    return this.User.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(err => res.status(412).send(err.message));
  }
}
