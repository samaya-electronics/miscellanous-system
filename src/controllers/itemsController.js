const { Item, Category } = require('../models')

const getItems = async (req, res) => {
    const items = await Item.findAll()
    res.json(items)
}

const createItem = async (req, res) => {

    const cat = await Category.create({name: "cat one"})
    const item = await Item.create({
        name: req.body.name,
        quantity: req.body.quantity,
        location: req.body.location,
        threshold: req.body.threshold,
        category_id: req.body.category_id
    })
    res.status(200).j
}

module.exports = {
    getItems,
    createItem
}