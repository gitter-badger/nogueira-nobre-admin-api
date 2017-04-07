export default class UserController {
  constructor(User) {
    this.User = User;
  }

  getAll(req, res) {
    return this.User.find({})
      .then(users => res.send(users.map(value => delete value.password)))
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    return this.User.findById(req.params.user_id)
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
  }

  create(req, res) {
    return this.User.create(req.body)
      .then(user => res.status(201).send(user))
      .catch(err => res.status(412).send(err.message));
  }
}
