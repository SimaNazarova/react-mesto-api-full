const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError, Unauthorized, ConflictError,
} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => { throw new NotFoundError('Нет пользователя c таким id'); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Нет пользователя c таким id'); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email адресом уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then(({ user }) => {
        res.status(200).send({ user });
      }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        res.send({
          user: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
          token,
        });
      }
    })
    .catch(() => next(new Unauthorized('Неверный логин или пароль')));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
};
