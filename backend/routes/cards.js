const router = require('express').Router();
const { cardValidation, cardIdValidation } = require('../middlewares/validation');
const {
  getCards, postCards, deleteCards, likeCard, dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', cardValidation, postCards);
router.delete('/:cardId', cardIdValidation, deleteCards);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
