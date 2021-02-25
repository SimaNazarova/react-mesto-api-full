const router = require('express').Router();
const {
  getUsers, getUser, getCurrentUser,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:_id', getUser);

module.exports = router;
