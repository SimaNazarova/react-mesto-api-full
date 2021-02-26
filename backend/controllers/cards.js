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
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findById(cardId)
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => {
      if (card.owner.toString() !== owner) {
        throw new ForbiddenError('Вы не можете удалить карточку');
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then((card) => res.send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Нет карточки c таким id'); })
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Нет карточки c таким id'); })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
