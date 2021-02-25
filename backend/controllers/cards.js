const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NotValidError = require('../errors/not-valid-err');
const RootError = require('../errors/root-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Данные не найдены');
      if (!card.owner.equals(req.user._id)) {
        throw new RootError('Ошибка доступа');
      }
      card.remove();
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Данные не найдены'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Данные не найдены'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Данные не найдены'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new NotValidError('Переданы некорректные данные'));
      }
      next(err);
    });
};
