const router = require('express').Router();
const auth = require('../middlewares/auth');


const controller = require('../controllers/users');

router.get('/users', auth, controller.getUsers);

router.get('/users/:userId', controller.getUser);

router.patch('/users/me', controller.updateUser);

router.get('/users/me', controller.getCurrentUser);

router.patch('/users/me/avatar', controller.updateAvatar);


module.exports = router;
