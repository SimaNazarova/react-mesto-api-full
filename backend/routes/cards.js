const router = require('express').Router();
const auth = require('../middlewares/auth');
const { cardValidation } = require('../middlewares/validation');
const controller = require('../controllers/cards');

router.get('/cards', auth, controller.getCards);
router.post('/cards', cardValidation, controller.postCards);

router.delete('/cards/:id', controller.deleteCards);

router.put('/cards/:id/likes', controller.likeCard);

router.delete('/cards/:id/likes', controller.dislikeCard);

module.exports = router;
