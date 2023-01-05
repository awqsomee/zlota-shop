const Router = require('express')
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/', authMiddleware, basketController.getAllItems)

module.exports = router
