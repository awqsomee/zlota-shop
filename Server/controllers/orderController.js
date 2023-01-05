const { Order, OrderItem, Item } = require('../models/models')

class orderController {
    async create(req, res) {
        const items = req.body
        console.log(items)
        const user = req.user
        const order = await Order.create({ userId: user.id })
        Promise.all(
            items.map(async (item) =>
                OrderItem.create({ orderId: order.id, itemId: item.item.id, amount: item.amount })
            )
        )
        return res.json(order)
    }

    async getAllItems(req, res) {
        const user = req.user
        const orders = await Order.findAll({
            where: { userId: user.id },
            include: [{ model: OrderItem, include: [Item] }],
        })
        return res.json(orders)
    }
}

module.exports = new orderController()
