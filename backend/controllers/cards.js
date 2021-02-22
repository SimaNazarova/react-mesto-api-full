/* eslint-disable no-unused-vars */
const Card = require('../models/card');
const { NotFoundError, BadRequest, ForbiddenError } = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const postCards = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные');
      }
    })
    .catch((err) => next(err));
};

const deleteCards = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Карточка не удалена');
      }});
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => { throw new NotFoundError('Нет карточки c таким id'); })
    .then(() => res.send({ message: 'удалено' }))
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Нет карточки c таким id'); })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Переданы некорректные данные');
      }
    })
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Нет карточки c таким id'); })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Переданы некорректные данные');
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
