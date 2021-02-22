const { celebrate, Joi } = require('celebrate');

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(/^https?:\/{2}(w{3}\.)?([\w.-\W]{1,})(\.)([a-z]{2,6})(\/?)([\w-.\W]*)/).required(),
  }),
});

const userRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/{2}(w{3}\.)?([\w.-\W]{1,})(\.)([a-z]{2,6})(\/?)([\w-.\W]*)/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  userValidation,
  cardValidation,
  userRegister,
};