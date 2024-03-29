const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError, Unauthorized, ConflictError,
} = require('../errors/allErrors');

const { NODE_ENV, JWT_SECRET } = process.env;

// найти всех юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

// найти юзера по id
const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => { throw new NotFoundError('Нет пользователя c таким id'); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

// получить данные текущего юзера
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Нет пользователя c таким id'); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

// создать нового юзера
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Данный email уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => next(err));
};

// авторизация
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
            email: user.email,
          },
          token,
        });
      }
    })
    .catch(() => next(new Unauthorized('Неправильные почта или пароль')));
};

// обновить данные
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

// обновить аватар
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменение
    },
  )
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  updateUser,
  updateAvatar,
};
