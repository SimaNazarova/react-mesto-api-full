const router = require('express').Router();
const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatar,
} = require('../controllers/users.js');
const { avatarValidation, currentUserValidation, userIdValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', userIdValidation, getUser);
router.patch('/me', currentUserValidation, updateUser);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;
