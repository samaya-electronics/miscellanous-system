const { Item } = require('../models')

const getItems = async (req, res) => {
    const items = await Item.findAll()
    res.json(items)
}

const createItem = async (req, res) => {
    const item = await Item.create({
        name: "item1",
        quantity: 100,
        location: "akher el denya shemal",
        threshold: 50,
        category_id: 1
    })
    res.json(item)
}

module.exports = {
    getItems,
    createItem
}