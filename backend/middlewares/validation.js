const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { BadRequest } = require('../errors/errors');

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

module.exports = {
  userValidation,
  cardValidation,
  userRegister,
};
