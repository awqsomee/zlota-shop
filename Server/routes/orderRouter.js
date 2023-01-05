const Router = require('express')
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/', authMiddleware, orderController.create)
router.get('/', authMiddleware, orderController.getAllItems)

module.exports = router
