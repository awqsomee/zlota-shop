const { BasketItem, Item } = require('../models/models')

class basketController {
    async getAllItems(req, res) {
        const user = req.user
        const items = await BasketItem.findAll({
            where: { basketId: user.id },
            include: Item,
        })
        return res.json(items)
    }
}

module.exports = new basketController()
