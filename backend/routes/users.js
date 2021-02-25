const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getProfile);
router.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w\-.~:/?#[\]@!$&'\\()*+,;=]/),
  }),
}), updateAvatar);

module.exports = router;
