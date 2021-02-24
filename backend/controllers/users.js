const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError, ConflictError,
} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => { throw new NotFoundError('Нет пользователя c таким id'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Нет пользователя c таким id'); })
    .then((user) => res.send({ user }))
    .catch((err) => next(err));
};


const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой пользователь уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then(({ _id }) => {
        res.send({
          _id, email, name, avatar, about,
        });
      }))
    .catch(next);
};

// const updateUser = (req, res, next) => {
//   const { name, about } = req.body;
//   User.findByIdAndUpdate(
//     req.params.id,
//     { name, about },
//     {
//       new: true, // обработчик then получит на вход обновлённую запись
//       runValidators: true, // данные будут валидированы перед изменением
//     },
//   )
//     .then((user) => res.status(200).send({ data: user }))
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         throw new BadRequest('Переданы некорректные данные');
//       }
//     })
//     .catch((err) => next(err));
// };

// const updateAvatar = (req, res, next) => {
//   const { avatar } = req.body;
//   User.findByIdAndUpdate(req.user._id, { avatar }, {
//     new: true,
//     runValidators: true,
//   })
//     .then((ava) => {
//       if (!ava) {
//         throw new BadRequest('Запрос неправильно сформирован');
//       }
//       res.send(ava);
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

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
        res.send({ token });
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
};
