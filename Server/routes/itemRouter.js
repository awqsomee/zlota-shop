const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)
router.post('/:id', authMiddleware, itemController.addItemToBasket)
router.delete('/:id', authMiddleware, itemController.removeItemFromBasket)

module.exports = router
