const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { BadRequest } = require('../errors/allErrors');

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((link) => {
      if (!validator.isURL(link)) {
        throw new BadRequest('Некорректная ссылка');
      }
      return link;
    }),
  }),
});

const userRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    link: Joi.string().custom((link) => {
      if (!validator.isURL(link)) {
        throw new BadRequest('Некорректная ссылка');
      }
      return link;
    }),
  }),
});

const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((link) => {
      if (!validator.isURL(link)) {
        throw new BadRequest('Некорректная ссылка');
      }
      return link;
    }),
  }),
});

const currentUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  userValidation,
  cardValidation,
  userRegister,
  avatarValidation,
  currentUserValidation,
  userIdValidation,
  cardIdValidation,
};
