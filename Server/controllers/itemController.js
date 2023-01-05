const uuid = require('uuid')
const path = require('path')
const { Item, ItemInfo, BasketItem, Basket } = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({ name, price, brandId, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach((i) =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: item.id,
                    })
                )
            }

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let items
        if (!brandId && !typeId) {
            items = await Item.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            items = await Item.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            items = await Item.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            items = await Item.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(items)
    }

    async getOne(req, res) {
        const { id } = req.params
        const item = await Item.findOne({
            where: { id },
            include: [{ model: ItemInfo, as: 'info' }],
        })
        return res.json(item)
    }

    async addItemToBasket(req, res) {
        const user = req.user
        const { id } = req.params
        const item = await BasketItem.findOne({ where: { itemId: id } })
        if (item) {
            item.amount++
            await item.save()
        } else await BasketItem.create({ basketId: user.id, itemId: id, amount: 1 })
        return res.json({ message: 'Товар добавлен' })
    }

    async removeItemFromBasket(req, res) {
        const user = req.user
        const { id } = req.params
        const item = await BasketItem.findOne({ where: { basketId: user.id, itemId: id } })
        if (item.amount > 1) {
            item.amount--
            await item.save()
        } else await item.destroy()
        return res.json({ message: 'Товар удален' })
    }
}

module.exports = new ItemController()
