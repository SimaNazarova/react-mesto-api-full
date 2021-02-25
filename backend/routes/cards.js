const router = require('express').Router();
const { cardValidation } = require('../middlewares/validation');
const {
  getCards, postCards, deleteCards, likeCard, dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', cardValidation, postCards);
router.delete('/:cardId', deleteCards);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
