const { Item } = require('../models')

const getItems = async (req, res) => {
    const items = await Item.findAll()
    res.json(items)
}

const getItemByPK = async (req, res) => {
    const item = await Item.findByPk(req.params.pk)
    res.json(item)
}

const createItem = async (req, res) => {
    await Item.create({
        name: req.body.name,
        quantity: req.body.quantity,
        location: req.body.location,
        threshold: req.body.threshold,
        category_id: req.body.category_id
    })
    res.end()
}

const updateItem = async (req, res) => {
    await Item.update({
        name: req.body.name,
        quantity: req.body.quantity,
        location: req.body.location,
        threshold: req.body.threshold,
        category_id: req.body.category_id
    },{
        where: {
            item_id: req.params.PK
        }
    })
    res.end()
}

const deleteItem = async (req, res) => {
    await Item.destroy({
        where: {
            item_id: req.params.PK
        }
    })
    res.end()
}


module.exports = {
    getItems,
    createItem,
    deleteItem,
    updateItem,
    getItemByPK
}